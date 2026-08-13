import { useEffect, useState } from 'react';
import { foodItemService } from '../../services/api';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { DataTable } from '../../components/ui/DataTable';
import { TableSkeleton } from '../../components/ui/Skeleton';

const INITIAL_FORM_STATE = {
  name: '',
  description: '',
  category: '',
  price: '',
  dietary_tags: [],
  is_fried: false,
  availability: true,
  image_url: ''
};

function AdminDashboard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = () => {
    setLoading(true);
    foodItemService.getAllItems().then(data => {
      setItems(data);
      setLoading(false);
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this?')) {
      await foodItemService.deleteItem(id);
      loadItems();
    }
  };

  const handleEdit = (item) => {
    setFormData({
      name: item.name,
      description: item.description,
      category: item.category,
      price: item.price,
      dietary_tags: item.dietary_tags || [],
      is_fried: item.is_fried || false,
      availability: item.availability !== false,
      image_url: item.image_url || ''
    });
    setEditingId(item.id);
    setIsFormOpen(true);
  };

  const handleAddNew = () => {
    setFormData(INITIAL_FORM_STATE);
    setEditingId(null);
    setIsFormOpen(true);
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setFormData(INITIAL_FORM_STATE);
    setEditingId(null);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'dietary_tags') {
      const tags = value.split(',').map(tag => tag.trim()).filter(Boolean);
      setFormData(prev => ({ ...prev, [name]: tags }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleTagsChange = (e) => {
    setFormData(prev => ({ ...prev, dietary_tags: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure dietary tags are array, price is number
    const tagsArray = typeof formData.dietary_tags === 'string'
      ? formData.dietary_tags.split(',').map(tag => tag.trim()).filter(Boolean)
      : formData.dietary_tags;

    const payload = {
      ...formData,
      dietary_tags: tagsArray,
      price: parseFloat(formData.price) || 0
    };

    try {
      if (editingId) {
        await foodItemService.updateItem(editingId, payload);
      } else {
        await foodItemService.addItem(payload);
      }
      setIsFormOpen(false);
      loadItems();
    } catch (error) {
      console.error("Error saving item:", error);
      alert("Failed to save item.");
    }
  };

  return (
    <div className="container py-5">

      {/* Header section with title and button side-by-side */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold m-0" style={{ letterSpacing: '-0.025em' }}>Item Management</h2>
        <Button variant="primary" onClick={handleAddNew}>+ Add New Item</Button>
      </div>

      {/* The Add/Edit Form Modal */}
      <Modal
        isOpen={isFormOpen}
        onClose={handleCancel}
        title={editingId ? 'Edit Item' : 'Add New Item'}
        maxWidth="700px"
      >
        <form onSubmit={handleSubmit}>
          <div className="row g-4">

            <div className="col-md-6">
              <label className="form-label fw-bold text-muted small text-uppercase mb-1">Name</label>
              <input type="text" className="form-control form-control-lg fs-6" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Truffle Fries" required />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-bold text-muted small text-uppercase mb-1">Category</label>
              <input type="text" className="form-control form-control-lg fs-6" name="category" value={formData.category} onChange={handleChange} placeholder="e.g. Starters" required />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-bold text-muted small text-uppercase mb-1">Price ($)</label>
              <input type="number" step="0.01" className="form-control form-control-lg fs-6" name="price" value={formData.price} onChange={handleChange} placeholder="9.99" required />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-bold text-muted small text-uppercase mb-1">Image URL</label>
              <input type="url" className="form-control form-control-lg fs-6" name="image_url" value={formData.image_url} onChange={handleChange} placeholder="https://..." />
            </div>

            <div className="col-12">
              <label className="form-label fw-bold text-muted small text-uppercase mb-1">Description</label>
              <textarea className="form-control fs-6" name="description" rows="3" value={formData.description} onChange={handleChange} placeholder="Delicious description of the item..." required></textarea>
            </div>

            <div className="col-12">
              <label className="form-label fw-bold text-muted small text-uppercase mb-1">Dietary Tags</label>
              <input type="text" className="form-control form-control-lg fs-6" name="dietary_tags"
                value={Array.isArray(formData.dietary_tags) ? formData.dietary_tags.join(', ') : formData.dietary_tags}
                onChange={handleTagsChange}
                placeholder="e.g. Vegetarian, Gluten-Free (Comma separated)"
              />
            </div>

            {/* Toggles */}
            <div className="col-12 mt-4 pt-3 border-top d-flex gap-5">
              <div className="form-check form-switch d-flex align-items-center gap-2 m-0 p-0">
                <input className="form-check-input m-0" type="checkbox" role="switch" name="is_fried" checked={formData.is_fried} onChange={handleChange} id="isFried" style={{ width: '40px', height: '20px' }} />
                <label className="form-check-label fw-medium mt-1" htmlFor="isFried">Is Fried?</label>
              </div>
              <div className="form-check form-switch d-flex align-items-center gap-2 m-0 p-0">
                <input className="form-check-input m-0" type="checkbox" role="switch" name="availability" checked={formData.availability} onChange={handleChange} id="availability" style={{ width: '40px', height: '20px' }} />
                <label className="form-check-label fw-medium mt-1" htmlFor="availability">Available to Order</label>
              </div>
            </div>

          </div>

          <div className="d-flex justify-content-end gap-2 mt-5">
            <Button variant="light" type="button" className="px-4 fw-medium" onClick={handleCancel}>Cancel</Button>
            <Button variant="primary" type="submit" className="px-4 fw-bold">{editingId ? 'Save Changes' : 'Create Item'}</Button>
          </div>
        </form>
      </Modal>

      {/* Reusable Data Table or Loading Skeleton */}
      {loading ? (
        <TableSkeleton rows={5} columns={5} />
      ) : (
        <DataTable
          columns={[
            { header: 'ID', key: 'id', render: (row) => <span className="text-muted">{row.id}</span> },
            {
              header: 'Name',
              key: 'name',
              render: (row) => (
                <div className="d-flex align-items-center gap-3">
                  <img
                    src={row.image_url}
                    alt={row.name}
                    className="rounded"
                    style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                  />
                  <span className="fw-medium">{row.name}</span>
                </div>
              )
            },
            { header: 'Category', key: 'category', render: (row) => <span className="text-muted">{row.category}</span> },
            { header: 'Price', key: 'price', render: (row) => <span className="fw-medium">${row.price.toFixed(2)}</span> },
            {
              header: 'Actions',
              key: 'actions',
              render: (row) => (
                <div className="d-flex gap-2">
                  <Button variant="secondary" className="btn-sm px-3 rounded-pill" onClick={() => handleEdit(row)}>Edit</Button>
                  <Button variant="danger" className="btn-sm px-3 rounded-pill" onClick={() => handleDelete(row.id)}>Delete</Button>
                </div>
              )
            }
          ]}
          data={items}
          searchPlaceholder="Search Menu Items"
          searchableKeys={['name', 'category']}
          itemsPerPage={5}
        />
      )}

    </div>
  );
}

export default AdminDashboard;

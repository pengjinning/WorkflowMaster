const NodePropertiesPanel = ({ node, onClose, onSave }) => {
  const [properties, setProperties] = useState({
    name: node?.data?.name || '',
    description: node?.data?.description || '',
    // Add other properties as needed
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperties({ ...properties, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(node.id, properties);
  };

  return (
    <div className="node-properties-panel">
      <button 
        type="button" 
        className="close-button" 
        aria-label="Close"
        onClick={onClose}
      >
        <i className="fas fa-times workflow-close-icon"></i>
      </button>
      <h3><i className="fas fa-cog me-2 workflow-icon"></i>Node Properties</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={properties.name}
            onChange={handleChange}
            placeholder="Enter node name"
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="3"
            value={properties.description}
            onChange={handleChange}
            placeholder="Enter description"
          ></textarea>
        </div>
        <div className="d-flex justify-content-between mt-4">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

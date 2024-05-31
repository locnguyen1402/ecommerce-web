const TableLoading = () => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
      }}
      className="d-flex justify-content-center align-items-center"
    >
      <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} />
    </div>
  );
};

export default TableLoading;

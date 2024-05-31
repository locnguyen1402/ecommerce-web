import { observer } from 'mobx-react-lite';

import { Toast, ToastType, useStore } from '@/stores';

const ToastContainer = observer(() => {
  const store = useStore('toastStore');

  const hideToast = (id: string) => {
    store.remove(id);
  };

  return (
    <div className="toast-container position-fixed top-0 bottom-0 end-0 overflow-hidden">
      {store.items.map((item) => {
        return <ToastItem key={item.id} toast={item} onHide={hideToast} />;
      })}
    </div>
  );
});

export { ToastContainer };

const ToastTypeClassMap: Record<
  ToastType,
  {
    container: string;
    icon: string;
  }
> = {
  info: {
    container: 'bg-light-primary',
    icon: 'bi-info-circle text-primary',
  },
  warning: {
    container: 'bg-light-warning',
    icon: 'bi-exclamation-triangle text-warning',
  },
  success: {
    container: 'bg-light-success',
    icon: 'bi-check-circle text-success',
  },
  error: {
    container: 'bg-light-danger',
    icon: 'bi-exclamation-circle text-danger',
  },
};

type ToastItemProps = {
  toast: Toast;
  onHide: (id: string) => void;
};

const ToastItem = ({ toast, onHide }: ToastItemProps) => {
  const classNames = ToastTypeClassMap[toast.type];
  return (
    <div
      className={`pe-auto alert d-flex flex-column flex-sm-row p-5 mt-6 me-6 w-250px w-sm-325px w-lg-350px ${classNames.container}`}
      onClick={(evt) => {
        evt.stopPropagation();
      }}
    >
      <i className={`bi fs-2hx me-4 mb-5 mb-sm-0 ${classNames.icon}`}></i>
      <div className="d-flex flex-column text-primary pe-0 pe-sm-10">
        <h5 className="mb-1">{toast.title}</h5>
        <span className="text-muted fw-medium">{toast.description}</span>
      </div>

      <button
        type="button"
        className="position-absolute position-sm-relative m-2 m-sm-0 top-0 end-0 btn btn-icon ms-sm-auto"
        onClick={(evt) => {
          evt.stopPropagation();
          onHide(toast.id);
        }}
      >
        <i className="bi bi-x-lg fs-4"></i>
      </button>
    </div>
  );
};


import toast, { Toaster } from 'react-hot-toast';

class formhelper {
  IsEmpty(value) {
    return value.length === 0; //true if get empty
  }

  getbase64(file) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = (err) => {
        reject(err);
      };
    });
  }

  successtoast(msg) {
    toast.success(msg);
  }

  errortoast(msg) {
    toast.error(msg);
  }
}

export const { getbase64, successtoast, errortoast, IsEmpty } = new formhelper();

import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { IoClose } from "react-icons/io5";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export default function UpdateProfileModal({userData, refetch}) {
  let [isOpen, setIsOpen] = useState(false);
  const { user, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();
    const {phoneNumber, address} = userData
  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    updateUserProfile({
      displayName: data.name,
      photoURL: data.photoURL,
    });
    setIsOpen(false);

    const res = await axiosSecure.patch(`/update-user/${user?.email}`, data);
    if (res.data.modifiedCount > 0) {
      toast("Profile Updated");
      refetch()
    }
  };
  return (
    <>
      <Button
        disabled={!user}
        onClick={open}
        className="rounded-md disabled:bg-gray-300 bg-primary hover:bg-primary-hover py-2 px-4 text-sm font-medium text-white focus:outline-none  data-[focus]:outline-1 data-[focus]:outline-white"
      >
        Update Profile
      </Button>

      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
        __demoMode
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-2xl rounded-xl bg-white drop-shadow-2xl text-black p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <div className="flex justify-end text-gray-600">
                <Button className="text-2xl" onClick={close}>
                  <IoClose />
                </Button>
              </div>
              {/* Content */}
              <form onSubmit={handleSubmit(onSubmit)} className="">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="form-control">
                    <label className="label">
                      <span className="text-lg font-semibold">Name</span>
                    </label>
                    <input
                      type="text"
                      defaultValue={user.displayName}
                      {...register("name")}
                      placeholder="Enter New Name"
                      className="input input-bordered"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="text-lg font-semibold">Image</span>
                    </label>
                    <input
                      type="url"
                      defaultValue={user.photoURL}
                      {...register("photoURL")}
                      placeholder="Enter Your Photo URL"
                      className="input input-bordered"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="form-control">
                    <label className="label">
                      <span className="text-lg font-semibold">
                        Phone Number
                      </span>
                    </label>
                    <input
                      type="number"
                      defaultValue={phoneNumber}
                      {...register("phoneNumber")}
                      placeholder="Enter Your Phone Number"
                      className="input input-bordered"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="text-lg font-semibold">Adress</span>
                    </label>
                    <input
                      type="text"
                      defaultValue={address}
                      {...register("address")}
                      placeholder="Enter Your Address"
                      className="input input-bordered"
                    />
                  </div>
                </div>

                <div className="form-control mt-6">
                  <button className="btn rounded-lg font-bold bg-primary mb-2">
                    Update
                  </button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}

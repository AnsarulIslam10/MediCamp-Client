import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { IoClose } from "react-icons/io5";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

export default function JoinCampModal({ camp, refetch }) {
  let [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  const {
    _id: campId,
    campName,
    campFees,
    location,
    healthcareProfessionalName,
  } = camp;

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
    const registeredCampData = {
      campId,
      campName,
      campFees,
      location,
      healthcareProfessionalName,
      paymentStatus: "unpaid",
      confirmationStatus: "pending",
      ...data,
    };
    const campRes = await axiosPublic.post(
      `/registered-camps`,
      registeredCampData
    );
    if (campRes.data.insertedId) {
      reset();
      refetch();
      setIsOpen(false);
      Swal.fire({
        title: `Camp is added`,
        icon: "success",
        showCancelButton: false,
        timer: 1500,
      });
    }
  };
  return (
    <>
      <Button
        disabled={!user}
        onClick={open}
        className="rounded-md disabled:bg-gray-300 bg-primary hover:bg-primary-hover py-2 px-4 text-sm font-medium text-white focus:outline-none  data-[focus]:outline-1 data-[focus]:outline-white"
      >
        {user === null ? "Login to join camp" : "Join Camp"}
        
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
                      <span className="text-lg font-semibold">Camp Name</span>
                    </label>
                    <input
                      type="text"
                      disabled
                      defaultValue={campName}
                      placeholder="Enter camp name"
                      readOnly
                      name="campName"
                      className="input input-bordered"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="text-lg font-semibold">Camp Fees</span>
                    </label>
                    <input
                      type="number"
                      disabled
                      defaultValue={campFees}
                      placeholder="Enter camp Fee"
                      name="campFees"
                      readOnly
                      min={1}
                      className="input input-bordered"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="form-control">
                    <label className="label">
                      <span className="text-lg font-semibold">
                        Healthcare Professional's Name
                      </span>
                    </label>
                    <input
                      type="text"
                      disabled
                      defaultValue={healthcareProfessionalName}
                      readOnly
                      placeholder="Enter Healthcare Professional Name"
                      className="input input-bordered"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="text-lg font-semibold">Location</span>
                    </label>
                    <input
                      type="text"
                      disabled
                      defaultValue={location}
                      readOnly
                      placeholder="Location"
                      className="input input-bordered"
                    />
                    {errors.location && (
                      <span className="text-red-500">
                        Location is required*
                      </span>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="form-control">
                    <label className="label">
                      <span className="text-lg font-semibold">
                        Participant Name
                      </span>
                    </label>
                    <input
                      type="text"
                      disabled
                      defaultValue={user?.displayName}
                      {...register("participantName", { required: true })}
                      readOnly
                      placeholder="Enter Healthcare Professional Name"
                      className="input input-bordered"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="text-lg font-semibold">
                        Participant Email
                      </span>
                    </label>
                    <input
                      type="text"
                      defaultValue={user?.email}
                      {...register("participantEmail", { required: true })}
                      readOnly
                      placeholder="Location"
                      disabled
                      className="input input-bordered"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="form-control">
                    <label className="label">
                      <span className="text-lg font-semibold">Age</span>
                    </label>
                    <input
                      type="number"
                      {...register("age", { required: true })}
                      placeholder="Enter your age"
                      className="input input-bordered"
                    />
                    {errors.age && (
                      <span className="text-red-500">Age is required*</span>
                    )}
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="text-lg font-semibold">
                        Phone Number
                      </span>
                    </label>
                    <input
                      type="number"
                      placeholder="Emter your phone number"
                      {...register("phoneNumber", { required: true })}
                      className="input input-bordered"
                    />
                    {errors.phoneNumber && (
                      <span className="text-red-500">
                        Phone Number is required*
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="form-control">
                    <label className="label">
                      <span className="text-lg font-semibold">Gender</span>
                    </label>
                    <select
                      {...register("gendar", { required: true })}
                      className="select-bordered select"
                    >
                      <option selected disabled value="">
                        Select your gendar
                      </option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                    {errors.gendar && (
                      <span className="text-red-500">Gendar is required*</span>
                    )}
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="text-lg font-semibold">
                        Emergency Contact
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Emergency Contact"
                      {...register("emergencyContact", { required: true })}
                      className="input input-bordered"
                    />
                    {errors.emergencyContact && (
                      <span className="text-red-500">
                        Emergency Contact is required*
                      </span>
                    )}
                  </div>
                </div>

                <div className="form-control mt-6">
                  <button className="btn rounded-lg font-bold bg-primary mb-2">
                    Join
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

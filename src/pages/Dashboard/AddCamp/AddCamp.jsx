import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { TbFidgetSpinner } from "react-icons/tb";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const AddCamp = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    setLoading(true);
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      const campData = {
        campName: data.campName,
        campFees: parseFloat(data.campFees),
        dateTime: data.dateTime,
        participantCount: parseInt(data.participantCount),
        healthcareProfessionalName: data.healthcareProfessionalName,
        location: data.location,
        image: res.data.data.display_url,
        description: data.description,
        email: user?.email,
      };
      const campRes = await axiosSecure.post("/add-camp", campData);
      if (campRes.data.insertedId) {
        reset();
        setLoading(false);
        Swal.fire({
          title: `Camp is added`,
          icon: "success",
          showCancelButton: false,
          timer: 1500,
        });
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-full max-w-5xl mx-auto text-[#444444] px-1 my-16">
      <Helmet>
        <title>MediCamp | Add Camp</title>
      </Helmet>
      <div className="card p-4 lg:p-10 w-full border">
        <h1 className="text-4xl text-center font-bold mb-8">Add A Camp</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="form-control">
              <label className="label">
                <span className="text-lg font-semibold">Camp Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter camp name"
                {...register("campName", { required: true })}
                name="campName"
                className="input input-bordered"
              />
              {errors.campName && (
                <span className="text-red-500">Camp Name is required*</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="text-lg font-semibold">Camp Fees</span>
              </label>
              <input
                type="number"
                placeholder="Enter camp Fee"
                {...register("campFees", { required: true })}
                name="campFees"
                min={1}
                className="input input-bordered"
              />
              {errors.campFees && (
                <span className="text-red-500">Camp Fees is required*</span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="form-control">
              <label className="label">
                <span className="text-lg font-semibold">Date & Time</span>
              </label>
              <input
                type="datetime-local"
                placeholder="datetime"
                {...register("dateTime", { required: true })}
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="text-lg font-semibold">Participant Count</span>
              </label>
              <input
                type="number"
                placeholder="Participant Count"
                {...register("participantCount", {
                  required: true,
                  valueAsNumber: true,
                })}
                defaultValue={0}
                readOnly
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
                placeholder="Enter Healthcare Professional Name"
                {...register("healthcareProfessionalName", {
                  required: true,
                })}
                className="input input-bordered"
              />
              {errors.healthcareProfessionalName && (
                <span className="text-red-500">
                  Healthcare Professional's Name is required*
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="text-lg font-semibold">Location</span>
              </label>
              <input
                type="text"
                placeholder="Location"
                {...register("location", { required: true })}
                className="input input-bordered"
              />
              {errors.location && (
                <span className="text-red-500">Location is required*</span>
              )}
            </div>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="text-lg font-semibold">Image</span>
            </label>
            <input
              {...register("image", { required: true })}
              type="file"
              className="file-input p-1 w-full max-w-xs"
            />
            {errors.image && (
              <span className="text-red-500">Image is required*</span>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="text-lg font-semibold">Description</span>
            </label>
            <textarea
              placeholder="description"
              {...register("description", { required: true })}
              className="textarea h-40 textarea-bordered"
            ></textarea>

            {errors.description && (
              <span className="text-red-500">Description is required*</span>
            )}
          </div>

          <div className="form-control mt-6">
            <button className="btn rounded-lg font-bold bg-primary mb-2">
              {loading ? (
                <TbFidgetSpinner className="animate-spin m-auto" />
              ) : (
                "Add Camp"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCamp;

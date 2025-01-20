import React from "react";
import { useForm } from "react-hook-form";

import Swal from "sweetalert2";

import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import Loading from "../../../../components/Shared/Loading";
import { Helmet } from "react-helmet-async";
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const UpdateCamp = () => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { data: campData, isLoading } = useQuery({
    queryKey: ["camp", id],
    queryFn: async () => {
      const res = await axiosPublic(`/camp/${id}`);
      return res.data;
    },
  });
  if (isLoading) {
    return <Loading></Loading>;
  }

  const onSubmit = async (data) => {
    let imageUrl = campData.image;
    if (data.image && data.image[0]) {
      const imageFile = { image: data.image[0] };
      try {
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
          headers: {
            "content-type": "multipart/form-data",
          },
        });
        imageUrl = res.data.data.display_url;
      } catch (error) {
        console.log(error);
        return;
      }
    }

    if (data) {
      const updateCampData = {
        campName: data.campName,
        campFees: parseFloat(data.campFees),
        dateTime: data.dateTime,
        participantCount: parseInt(data.participantCount),
        healthcareProfessionalName: data.healthcareProfessionalName,
        location: data.location,
        description: data.description,
        image: imageUrl,
      };
      axiosSecure
        .patch(`/update-camp/${id}`, updateCampData)
        .then((res) => {
          if (res.data.modifiedCount > 0) {
            reset();
            Swal.fire({
              title: `Camp details Updated`,
              icon: "success",
              showCancelButton: false,
              timer: 1500,
            });
            navigate("/dashboard/manage-camps");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div className="flex w-full max-w-5xl justify-center items-center min-h-screen text-[#444444] px-10">
      <Helmet>
        <title>MediCamp | Update Camp</title>
      </Helmet>
      <div className="card p-10 w-full border">
        <h1 className="text-4xl text-center font-bold mb-8">
          Update Camp Details
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="form-control">
              <label className="label">
                <span className="text-lg font-semibold">Camp Name</span>
              </label>
              <input
                type="text"
                defaultValue={campData.campName}
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
                defaultValue={campData.campFees}
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
                defaultValue={campData.dateTime}
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
                defaultValue={campData.participantCount}
                placeholder="Participant Count"
                {...register("participantCount", {
                  required: true,
                  valueAsNumber: true,
                })}
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
                defaultValue={campData.healthcareProfessionalName}
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
                defaultValue={campData.location}
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
              {...register("image")}
              type="file"
              className="file-input p-1 w-full max-w-xs"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="text-lg font-semibold">Description</span>
            </label>
            <textarea
              placeholder="description"
              defaultValue={campData.description}
              {...register("description", { required: true })}
              className="textarea h-40 textarea-bordered"
            ></textarea>

            {errors.description && (
              <span className="text-red-500">Description is required*</span>
            )}
          </div>

          <div className="form-control mt-6">
            <button className="btn rounded-lg font-bold bg-primary mb-2">
              Update Camp
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCamp;

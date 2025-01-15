import React from "react";

const UpdateCamp = () => {
  return (
    <div className="flex w-full max-w-5xl justify-center items-center min-h-screen text-[#444444] px-10">
      <div className="card p-10 w-full border">
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

            {errors.description && (
              <span className="text-red-500">Description is required*</span>
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
              Add Camp
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCamp;

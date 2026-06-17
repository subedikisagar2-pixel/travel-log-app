import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

export default function EditLog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    api.get(`/logs/${id}`).then((r) => {
      const log = r.data;
      reset({
        title: log.title,
        destination: log.destination,
        date: log.date?.split("T")[0],
        description: log.description,
        rating: log.rating,
      });
    });
  }, [id]);

  const onSubmit = async (data) => {
    try {
      await api.put(`/logs/${id}`, data);
      toast.success("Log updated!");
      navigate(`/logs/${id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6">Edit Travel Log</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <input
          {...register("title")}
          placeholder="Title"
          className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          {...register("destination")}
          placeholder="Destination"
          className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          {...register("date")}
          type="date"
          className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <textarea
          {...register("description")}
          rows={5}
          className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <select
          {...register("rating")}
          className="border rounded-lg px-4 py-2 focus:outline-none"
        >
          {[1, 2, 3, 4, 5].map((r) => (
            <option key={r} value={r}>
              {r} ⭐
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700"
        >
          Update Log
        </button>
      </form>
    </div>
  );
}

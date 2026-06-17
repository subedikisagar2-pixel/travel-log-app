import React, { useState, useEffect, useRef } from "react";

export default function CreateLog() {
  const [title, setTitle] = useState("");
  const [destination, setDestination] = useState("");
  const [images, setImages] = useState([]);
  const [rating, setRating] = useState(5);

  const autoCompleteRef = useRef(null);
  const inputRef = useRef(null);

  // Google Places Autocomplete
  useEffect(() => {
    if (!window.google) return;

    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      { types: ["(cities)"] },
    );

    const listener = autoCompleteRef.current.addListener(
      "place_changed",
      () => {
        const place = autoCompleteRef.current.getPlace();
        if (place?.formatted_address) {
          setDestination(place.formatted_address);
        }
      },
    );

    return () => {
      if (listener) listener.remove();
    };
  }, []);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length + images.length > 5) {
      alert("You can upload a maximum of 5 images per log.");
      return;
    }

    setImages((prev) => [...prev, ...files]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      title,
      destination,
      rating,
      images,
    };

    console.log("Travel Log:", formData);
    alert("Travel log published successfully!");
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-100">
        <h2 className="text-3xl font-extrabold mb-8">
          Log a New Travel Memory
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="text-xs font-bold uppercase text-slate-500">
              Log Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="E.g., A Magical Week in Pokhara"
              className="w-full px-4 py-3 bg-slate-50 border rounded-xl mt-2"
            />
          </div>

          {/* Destination */}
          <div>
            <label className="text-xs font-bold uppercase text-slate-500">
              Destination
            </label>

            <div className="relative mt-2">
              <span className="absolute left-3 top-3">📍</span>

              <input
                ref={inputRef}
                type="text"
                required
                placeholder="Search destination..."
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full pl-10 px-4 py-3 bg-slate-50 border rounded-xl"
              />
            </div>
          </div>

          {/* Images */}
          <div>
            <label className="text-xs font-bold uppercase text-slate-500">
              Photos (Max 5)
            </label>

            <div className="relative mt-2 border-2 border-dashed rounded-2xl p-6 text-center">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />

              <p className="text-sm">Click to upload images</p>
            </div>

            {/* Preview */}
            {images.length > 0 && (
              <div className="flex gap-3 mt-4 overflow-x-auto">
                {images.map((img, idx) => (
                  <div key={idx} className="relative w-16 h-16">
                    <img
                      src={URL.createObjectURL(img)}
                      alt="preview"
                      className="w-full h-full object-cover rounded-xl"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Rating */}
          <div>
            <label className="text-xs font-bold uppercase text-slate-500">
              Trip Rating: {rating} ★
            </label>

            <input
              type="range"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full mt-2"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-xl"
          >
            Publish Travel Log
          </button>
        </form>
      </div>
    </div>
  );
}

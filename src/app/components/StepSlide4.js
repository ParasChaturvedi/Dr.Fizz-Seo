"use client";
import { ArrowRight, ArrowLeft } from "lucide-react";

export default function StepSlide4({ onNext, onBack }) {
  return (
    <div className="w-full h-screen flex flex-col bg-gray-100">
      <div className="flex-1 flex flex-col justify-center items-center">
        <div className="text-gray-500 text-sm font-medium mb-2">Step - 4</div>
        <div className="text-3xl font-bold text-gray-900 mb-4">Add Your Keywords</div>
        <div className="text-lg text-gray-600 max-w-xl mx-auto mb-10">
          (Your Step 4 content and controls here)
        </div>
        <div className="flex justify-center gap-4">
          <button
            onClick={onBack}
            className="bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-full flex items-center gap-2 border border-gray-300"
          ><ArrowLeft size={16} /> Back</button>
          <button
            onClick={onNext}
            className="bg-gray-700 hover:bg-gray-800 text-white px-8 py-3 rounded-full flex items-center gap-2"
          >Next <ArrowRight size={16} /></button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { Pin, PinOff } from "lucide-react";

export default function InfoPanel({ isOpen, onClose, isPinned, setIsPinned, websiteData, businessData, currentStep }) {
  const panelRef = useRef(null);

  // Outside-click closes panel when not pinned
  useEffect(() => {
    function handleClickOutside(e) {
      if (isPinned) return;
      if (e.target.closest("#sidebar-info-btn")) return;
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        onClose && onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isPinned, onClose]);

  // Generate random stats based on website
  const generateRandomStats = (website) => {
    if (!website) return { domainAuthority: 49, organicTraffic: 72, organicKeyword: 75 };
    
    const seed = website.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const random1 = (seed * 9301 + 49297) % 233280;
    const random2 = (random1 * 9301 + 49297) % 233280;
    const random3 = (random2 * 9301 + 49297) % 233280;
    
    return {
      domainAuthority: Math.floor((random1 / 233280) * 100) + 1,
      organicTraffic: Math.floor((random2 / 233280) * 100) + 1,
      organicKeyword: Math.floor((random3 / 233280) * 100) + 1
    };
  };

  const stats = generateRandomStats(websiteData?.website);
  const displayWebsite = websiteData?.website || "yourcompany.com";

  // Step 1 Content
  const renderStep1Content = () => (
    <div className="space-y-6">
      {/* Website stats */}
      <div className="bg-white rounded-lg p-4 shadow-sm border">
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs text-gray-600 font-medium">WEBSITE :</div>
          <div className="flex items-center gap-2">
            <div className="text-sm font-medium text-gray-800">{displayWebsite}</div>
            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">Good</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white px-3 py-3 rounded shadow-sm text-center border">
            <div className="flex items-center justify-center gap-1 mb-1">
              <div className="text-xl font-bold text-gray-800">{stats.domainAuthority}</div>
              <div className="text-gray-400">↓</div>
            </div>
            <div className="text-xs text-gray-500 mb-1">Domain Authority</div>
            <div className="text-xs text-gray-400">3445</div>
          </div>
          <div className="bg-white px-3 py-3 rounded shadow-sm text-center border">
            <div className="flex items-center justify-center gap-1 mb-1">
              <div className="text-xl font-bold text-gray-800">{stats.organicTraffic}</div>
              <div className="text-gray-400">↓</div>
            </div>
            <div className="text-xs text-gray-500 mb-1">Organic Traffic</div>
            <div className="text-xs text-gray-400">29</div>
          </div>
          <div className="bg-white px-3 py-3 rounded shadow-sm text-center border">
            <div className="flex items-center justify-center gap-1 mb-1">
              <div className="text-xl font-bold text-gray-800">{stats.organicKeyword}</div>
              <div className="text-gray-400">↓</div>
            </div>
            <div className="text-xs text-gray-500 mb-1">Organic Keyword</div>
            <div className="text-xs text-gray-400">29</div>
          </div>
        </div>
      </div>

      {/* FIX THIS section */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-4 h-4 bg-orange-500 rounded-sm flex items-center justify-center">
            <span className="text-white text-xs">!</span>
          </div>
          <h4 className="text-sm font-bold text-gray-800">FIX THIS</h4>
        </div>

        <div className="bg-white rounded-lg border shadow-sm p-3 mb-4">
          <div className="flex items-start justify-between mb-2">
            <div>
              <div className="text-sm font-semibold text-gray-800">Domain Authority ({stats.domainAuthority})</div>
              <div className="text-xs text-gray-500">Your site trust score (0–100)</div>
              <div className="text-xs text-gray-500 mt-1">{stats.domainAuthority} = above average for SMBs</div>
            </div>
            <div className="text-gray-400 cursor-help">?</div>
          </div>

          <button className="mb-3 inline-block bg-yellow-400 text-black text-xs px-3 py-1 rounded font-medium">
            IMPROVE : BUILT QUALITY BACKLINKS
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-8 rounded bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
              DA
            </div>
            <div className="text-sm text-gray-700">How to Build Domain Authority</div>
            <div className="text-gray-400">⋯</div>
          </div>
        </div>

        <div className="bg-white rounded-lg border shadow-sm p-3">
          <div className="flex items-start justify-between mb-2">
            <div>
              <div className="text-sm font-semibold text-gray-800">Organic Traffic ({stats.organicTraffic})</div>
              <div className="text-xs text-gray-500">Monthly visits from free searches.</div>
              <div className="text-xs text-gray-500 mt-1">{stats.organicTraffic} = visitors last month.</div>
            </div>
            <div className="text-gray-400 cursor-help">?</div>
          </div>

          <div className="mb-3 inline-block bg-yellow-300 text-black text-xs px-3 py-1 rounded">
            Each organic visitor costs $0 vs $2–5 for ads.
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-8 rounded bg-green-600 flex items-center justify-center text-white text-xs font-bold">
              TR
            </div>
            <div className="text-sm text-gray-700">Turn Traffic Into Customers</div>
            <div className="text-gray-400">⋯</div>
          </div>
        </div>
      </div>
    </div>
  );

  // Step 2 Content - EXACT from Image 5
  const renderStep2Content = () => (
    <div className="space-y-6">
      {/* Website + Business Data */}
      <div className="bg-white rounded-lg p-4 shadow-sm border">
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs text-gray-600 font-medium">WEBSITE :</div>
          <div className="flex items-center gap-2">
            <div className="text-sm font-medium text-gray-800">{displayWebsite}</div>
            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">Good</span>
          </div>
        </div>

        {/* Business Data Section */}
        {businessData && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="space-y-1">
              <div className="text-xs text-gray-600">
                <span className="font-medium">Industry Sector:</span> {businessData.industry}
              </div>
              <div className="text-xs text-gray-600">
                <span className="font-medium">Offering Type:</span> {businessData.offering}
              </div>
              <div className="text-xs text-gray-600">
                <span className="font-medium">Category:</span> {businessData.category}
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white px-3 py-3 rounded shadow-sm text-center border">
            <div className="flex items-center justify-center gap-1 mb-1">
              <div className="text-xl font-bold text-gray-800">{stats.domainAuthority}</div>
              <div className="text-gray-400">↓</div>
            </div>
            <div className="text-xs text-gray-500 mb-1">Domain Authority</div>
            <div className="text-xs text-gray-400">3445</div>
          </div>
          <div className="bg-white px-3 py-3 rounded shadow-sm text-center border">
            <div className="flex items-center justify-center gap-1 mb-1">
              <div className="text-xl font-bold text-gray-800">{stats.organicTraffic}</div>
              <div className="text-gray-400">↓</div>
            </div>
            <div className="text-xs text-gray-500 mb-1">Organic Traffic</div>
            <div className="text-xs text-gray-400">29</div>
          </div>
          <div className="bg-white px-3 py-3 rounded shadow-sm text-center border">
            <div className="flex items-center justify-center gap-1 mb-1">
              <div className="text-xl font-bold text-gray-800">{stats.organicKeyword}</div>
              <div className="text-gray-400">↓</div>
            </div>
            <div className="text-xs text-gray-500 mb-1">Organic Keyword</div>
            <div className="text-xs text-gray-400">29</div>
          </div>
        </div>
      </div>

      {/* FIX THIS section for Step 2 */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-4 h-4 bg-orange-500 rounded-sm flex items-center justify-center">
            <span className="text-white text-xs">!</span>
          </div>
          <h4 className="text-sm font-bold text-gray-800">FIX THIS</h4>
        </div>

        {/* Why Industry Matters */}
        <div className="bg-white rounded-lg border shadow-sm p-3 mb-4">
          <div className="flex items-start justify-between mb-2">
            <div>
              <div className="text-sm font-semibold text-gray-800">Why Industry Matters</div>
              <div className="text-xs text-gray-500 mt-1">• Personalized Benchmarks vs. relevant peers</div>
            </div>
            <div className="text-gray-400 cursor-help">?</div>
          </div>

          <div className="mt-3">
            <div className="text-xs text-gray-600 mb-2">Keyword suggestion</div>
            <div className="flex gap-2 flex-wrap">
              <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded">KEYWORD-1</span>
              <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded">KEYWORD-2</span>
              <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded">KEYWORD-3</span>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-3">
            <div className="w-12 h-8 rounded bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
              SEO
            </div>
            <div className="text-sm text-gray-700">Industry SEO Strategies</div>
            <div className="text-gray-400">⋯</div>
          </div>
        </div>

        {/* Business Type Impact */}
        <div className="bg-white rounded-lg border shadow-sm p-3">
          <div className="flex items-start justify-between mb-2">
            <div>
              <div className="text-sm font-semibold text-gray-800">Business Type Impact</div>
              <div className="text-xs text-gray-500 mt-1">• Local vs. national focus</div>
              <div className="text-xs text-gray-500">• Content and customer journey differences</div>
            </div>
            <div className="text-gray-400 cursor-help">?</div>
          </div>

          <div className="flex items-center gap-3 mt-3">
            <div className="w-12 h-8 rounded bg-green-600 flex items-center justify-center text-white text-xs font-bold">
              DA
            </div>
            <div className="text-sm text-gray-700">How to Build Domain Authority</div>
            <div className="text-gray-400">⋯</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div
      ref={panelRef}
      aria-hidden={!isOpen}
      className={
        "fixed left-[80px] top-0 h-full w-[320px] bg-[#f9fafb] border-r border-gray-200 shadow-md transform transition-transform duration-300 ease-in-out z-40 " +
        (isOpen ? "translate-x-0" : "-translate-x-full")
      }
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b bg-white">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-gray-800 rounded-sm" />
          <h3 className="text-lg font-semibold text-gray-800">INFO</h3>
        </div>

        <button
          onClick={() => setIsPinned((p) => !p)}
          className="p-2 text-blue-500 hover:text-blue-700 rounded"
          title={isPinned ? "Unpin panel" : "Pin panel"}
        >
          {isPinned ? <PinOff size={18} /> : <Pin size={18} />}
        </button>
      </div>

      {/* Body - Dynamic content based on current step */}
      <div className="p-4 overflow-y-auto h-full">
        {currentStep === 1 ? renderStep1Content() : renderStep2Content()}
        
        {/* Footer note */}
        <div className="text-xs text-gray-500 mt-6">Answers & tips appear here.</div>
      </div>
    </div>
  );
}

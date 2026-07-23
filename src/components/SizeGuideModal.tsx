import { useState } from 'react';
import { X, Ruler, Footprints, ArrowDownUp, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SizeGuideModal({ isOpen, onClose }: SizeGuideModalProps) {
  const [unit, setUnit] = useState<'cm' | 'inches'>('cm');

  const sizes = [
    { size: '37', cm: '23.7', inches: '9.33' },
    { size: '38', cm: '24.3', inches: '9.57' },
    { size: '39', cm: '25.0', inches: '9.84' },
    { size: '40', cm: '25.7', inches: '10.12' },
    { size: '41', cm: '26.3', inches: '10.35' },
    { size: '42', cm: '27.0', inches: '10.63' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[150]"
          />
          <div className="fixed inset-0 z-[160] flex items-center justify-center p-4 sm:p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl pointer-events-auto relative flex flex-col"
            >
              {/* Sticky Header */}
              <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-5 border-b border-rose-100 flex items-center justify-between z-10 rounded-t-2xl">
                <h2 className="text-2xl font-serif font-bold text-rose-950">Size Guide</h2>
                <button
                  onClick={onClose}
                  className="p-2 -mr-2 bg-rose-50 hover:bg-rose-100 text-rose-950 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-rose-400"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 sm:p-8 space-y-10">
                {/* Size Table Section */}
                <section>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-sm font-medium tracking-widest text-yellow-600 uppercase">Measurements</h3>
                    <div className="flex p-1 bg-rose-50 rounded-lg">
                      <button
                        onClick={() => setUnit('cm')}
                        className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                          unit === 'cm' ? 'bg-white text-rose-950 shadow-sm' : 'text-rose-700 hover:text-rose-950'
                        }`}
                      >
                        CM
                      </button>
                      <button
                        onClick={() => setUnit('inches')}
                        className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                          unit === 'inches' ? 'bg-white text-rose-950 shadow-sm' : 'text-rose-700 hover:text-rose-950'
                        }`}
                      >
                        Inches
                      </button>
                    </div>
                  </div>

                  <div className="overflow-hidden border border-rose-100 rounded-xl">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-rose-50">
                          <th className="py-4 px-6 font-semibold text-rose-950 text-sm border-b border-rose-100">EU Size</th>
                          <th className="py-4 px-6 font-semibold text-rose-950 text-sm border-b border-rose-100">
                            Length ({unit === 'cm' ? 'CM' : 'Inches'})
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-rose-100">
                        {sizes.map((row) => (
                          <tr key={row.size} className="hover:bg-rose-50/50 transition-colors">
                            <td className="py-4 px-6 text-sm font-medium text-rose-950">{row.size}</td>
                            <td className="py-4 px-6 text-sm text-rose-800">
                              {unit === 'cm' ? row.cm : row.inches}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                {/* How to Measure */}
                <section>
                  <h3 className="text-sm font-medium tracking-widest text-yellow-600 uppercase mb-6">How to Measure</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-rose-100 text-rose-900 flex items-center justify-center font-bold text-sm">1</div>
                      <p className="text-sm text-rose-800 leading-relaxed">Place a sheet of paper flat against a wall on a hard surface.</p>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-rose-100 text-rose-900 flex items-center justify-center font-bold text-sm">2</div>
                      <p className="text-sm text-rose-800 leading-relaxed">Stand on the paper with your heel firmly against the wall.</p>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-rose-100 text-rose-900 flex items-center justify-center font-bold text-sm">3</div>
                      <p className="text-sm text-rose-800 leading-relaxed">Mark the longest part of your foot (usually the big toe) on the paper.</p>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-rose-100 text-rose-900 flex items-center justify-center font-bold text-sm">4</div>
                      <p className="text-sm text-rose-800 leading-relaxed">Measure the distance from the wall to the mark and match it with the size chart.</p>
                    </div>
                  </div>
                </section>

                {/* Fit Tips */}
                <section className="bg-rose-50 rounded-xl p-6 border border-rose-100">
                  <h3 className="text-sm font-medium tracking-widest text-yellow-600 uppercase mb-4 flex items-center">
                    <Footprints className="w-4 h-4 mr-2" />
                    Expert Fit Tips
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start text-sm text-rose-800">
                      <Clock className="w-5 h-5 mr-3 text-rose-400 flex-shrink-0" />
                      <span>Measure your feet in the evening as they tend to swell slightly during the day for the most accurate fit.</span>
                    </li>
                    <li className="flex items-start text-sm text-rose-800">
                      <ArrowDownUp className="w-5 h-5 mr-3 text-rose-400 flex-shrink-0" />
                      <span>Measure both feet and use the larger measurement. It's common for one foot to be slightly larger than the other.</span>
                    </li>
                    <li className="flex items-start text-sm text-rose-800">
                      <Ruler className="w-5 h-5 mr-3 text-rose-400 flex-shrink-0" />
                      <span>If you're exactly between two sizes, we generally recommend choosing the larger size for comfort.</span>
                    </li>
                    <li className="flex items-start text-sm text-rose-800">
                      <Footprints className="w-5 h-5 mr-3 text-rose-400 flex-shrink-0" />
                      <span>Ensure you are standing upright while measuring, as your foot expands when bearing weight.</span>
                    </li>
                  </ul>
                </section>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

import { Palette, Shirt, Type } from 'lucide-react';
import { JerseyConfig, PatternType } from '../types/jersey';
import { colorOptions, defaultVariants } from '../data/jerseyVariants';

interface CustomizationPanelProps {
  config: JerseyConfig;
  onConfigChange: (config: Partial<JerseyConfig>) => void;
}

export function CustomizationPanel({ config, onConfigChange }: CustomizationPanelProps) {
  const patterns: { name: string; value: PatternType }[] = [
    { name: 'Plain', value: 'plain' },
    { name: 'Stripes', value: 'stripes' },
    { name: 'Diagonal', value: 'diagonal' },
    { name: 'Texture', value: 'texture' },
  ];

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 space-y-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Customize Jersey</h2>

      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-3">
          <Shirt className="w-5 h-5 text-gray-700" />
          <h3 className="text-lg font-semibold text-gray-900">Quick Presets</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {defaultVariants.map((variant) => (
            <button
              key={variant.id}
              onClick={() =>
                onConfigChange({
                  primaryColor: variant.primaryColor,
                  secondaryColor: variant.secondaryColor,
                  pattern: variant.pattern,
                })
              }
              className="group relative overflow-hidden rounded-lg border-2 border-gray-200 hover:border-gray-900 transition-all p-4"
            >
              <div
                className="w-full h-12 rounded mb-2"
                style={{ backgroundColor: variant.primaryColor }}
              />
              <p className="text-sm font-medium text-gray-900">{variant.name}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-3">
          <Palette className="w-5 h-5 text-gray-700" />
          <h3 className="text-lg font-semibold text-gray-900">Primary Color</h3>
        </div>
        <div className="grid grid-cols-5 gap-3">
          {colorOptions.map((color) => (
            <button
              key={color.value}
              onClick={() => onConfigChange({ primaryColor: color.value })}
              className={`group relative w-full aspect-square rounded-lg border-3 transition-all ${
                config.primaryColor === color.value
                  ? 'border-gray-900 ring-4 ring-gray-900 ring-opacity-20'
                  : 'border-gray-300 hover:border-gray-500'
              }`}
              style={{ backgroundColor: color.value }}
              title={color.name}
            >
              {config.primaryColor === color.value && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full shadow-lg" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-3">
          <Type className="w-5 h-5 text-gray-700" />
          <h3 className="text-lg font-semibold text-gray-900">Jersey Details</h3>
        </div>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Front Number
            </label>
            <input
              type="text"
              value={config.frontNumber}
              onChange={(e) =>
                onConfigChange({ frontNumber: e.target.value.slice(0, 2) })
              }
              maxLength={2}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gray-900 focus:ring-4 focus:ring-gray-900 focus:ring-opacity-10 transition-all"
              placeholder="10"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Player Name
            </label>
            <input
              type="text"
              value={config.backName}
              onChange={(e) =>
                onConfigChange({ backName: e.target.value.slice(0, 12) })
              }
              maxLength={12}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gray-900 focus:ring-4 focus:ring-gray-900 focus:ring-opacity-10 transition-all"
              placeholder="PLAYER"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Back Number
            </label>
            <input
              type="text"
              value={config.backNumber}
              onChange={(e) =>
                onConfigChange({ backNumber: e.target.value.slice(0, 2) })
              }
              maxLength={2}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gray-900 focus:ring-4 focus:ring-gray-900 focus:ring-opacity-10 transition-all"
              placeholder="10"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-3">
          <Shirt className="w-5 h-5 text-gray-700" />
          <h3 className="text-lg font-semibold text-gray-900">Pattern</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {patterns.map((pattern) => (
            <button
              key={pattern.value}
              onClick={() => onConfigChange({ pattern: pattern.value })}
              className={`px-4 py-3 rounded-lg font-medium transition-all ${
                config.pattern === pattern.value
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }`}
            >
              {pattern.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

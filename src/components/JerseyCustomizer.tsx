import { useState, useEffect } from 'react';
import { JerseyConfig } from '../types/jersey';
import { JerseyView } from './JerseyView';
import { CustomizationPanel } from './CustomizationPanel';

export function JerseyCustomizer() {
  const [config, setConfig] = useState<JerseyConfig>({
    primaryColor: '#1f2937',
    secondaryColor: '#ffffff',
    logoUrl: '/image.png',
    frontNumber: '10',
    backName: 'PLAYER',
    backNumber: '10',
    pattern: 'plain',
  });

  const [logoImage, setLogoImage] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => setLogoImage(img);
    img.src = config.logoUrl;
  }, [config.logoUrl]);

  const handleConfigChange = (updates: Partial<JerseyConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-4xl font-bold text-gray-900">
            Football Jersey Customizer
          </h1>
          <p className="text-gray-600 mt-2">
            Design your perfect football jersey in 3D
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Jersey Only View
              </h2>
              <div className="w-full h-[500px]">
                <JerseyView
                  config={config}
                  showPlayer={false}
                  logoImage={logoImage}
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Player Wearing Jersey
              </h2>
              <div className="w-full h-[500px]">
                <JerseyView
                  config={config}
                  showPlayer={true}
                  logoImage={logoImage}
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <CustomizationPanel
                config={config}
                onConfigChange={handleConfigChange}
              />
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center text-gray-600">
          <p>Drag the 3D models to rotate and view from all angles</p>
        </div>
      </footer>
    </div>
  );
}

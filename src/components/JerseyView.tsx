import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { SceneManager } from '../utils/sceneSetup';
import { createJerseyGeometry, createPlayerModel, updateJerseyColor } from '../utils/jerseyGeometry';
import { TextureCreator } from '../utils/textureCreator';
import { JerseyConfig } from '../types/jersey';

interface JerseyViewProps {
  config: JerseyConfig;
  showPlayer: boolean;
  logoImage: HTMLImageElement | null;
}

export function JerseyView({ config, showPlayer, logoImage }: JerseyViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneManagerRef = useRef<SceneManager | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const textureCreatorRef = useRef<TextureCreator>(new TextureCreator());

  useEffect(() => {
    if (!containerRef.current) return;

    const sceneManager = new SceneManager({ container: containerRef.current });
    sceneManagerRef.current = sceneManager;

    const model = showPlayer ? createPlayerModel() : createJerseyGeometry();
    modelRef.current = model;
    sceneManager.scene.add(model);

    updateTextures();

    sceneManager.animate(() => {
      if (modelRef.current) {
        modelRef.current.rotation.x = sceneManager.currentRotation.x;
        modelRef.current.rotation.y = sceneManager.currentRotation.y;
      }
    });

    return () => {
      sceneManager.dispose();
    };
  }, [showPlayer]);

  useEffect(() => {
    updateTextures();
  }, [config, logoImage]);

  const updateTextures = () => {
    if (!modelRef.current) return;

    const textureCreator = textureCreatorRef.current;
    const frontTexture = textureCreator.createJerseyTexture(
      config.primaryColor,
      logoImage,
      config.frontNumber,
      config.pattern
    );
    const backTexture = textureCreator.createBackTexture(
      config.primaryColor,
      config.backName,
      config.backNumber,
      config.pattern
    );
    const sleeveTexture = textureCreator.createSleeveTexture(config.primaryColor);

    if (showPlayer) {
      const jerseyGroup = modelRef.current.children.find(
        (child) => child instanceof THREE.Group
      ) as THREE.Group;
      if (jerseyGroup) {
        updateJerseyColor(jerseyGroup, frontTexture, backTexture, sleeveTexture);
      }
    } else {
      updateJerseyColor(modelRef.current, frontTexture, backTexture, sleeveTexture);
    }
  };

  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className="w-full h-full rounded-xl overflow-hidden shadow-2xl" />
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-60 text-white px-4 py-2 rounded-full text-sm">
        Drag to rotate
      </div>
    </div>
  );
}

import * as THREE from 'three';

export function createJerseyGeometry(): THREE.Group {
  const jerseyGroup = new THREE.Group();

  const torsoGeometry = new THREE.BoxGeometry(2, 2.5, 0.3);
  const torsoMaterial = new THREE.MeshStandardMaterial({
    color: 0xff0000,
    roughness: 0.7,
    metalness: 0.1,
  });
  const torso = new THREE.Mesh(torsoGeometry, torsoMaterial);
  jerseyGroup.add(torso);

  const leftSleeveGeometry = new THREE.CylinderGeometry(0.25, 0.22, 1.2, 16);
  const sleeveMaterial = new THREE.MeshStandardMaterial({
    color: 0xff0000,
    roughness: 0.7,
    metalness: 0.1,
  });
  const leftSleeve = new THREE.Mesh(leftSleeveGeometry, sleeveMaterial);
  leftSleeve.position.set(-1.2, -0.3, 0);
  leftSleeve.rotation.z = Math.PI / 2.5;
  jerseyGroup.add(leftSleeve);

  const rightSleeve = new THREE.Mesh(leftSleeveGeometry, sleeveMaterial.clone());
  rightSleeve.position.set(1.2, -0.3, 0);
  rightSleeve.rotation.z = -Math.PI / 2.5;
  jerseyGroup.add(rightSleeve);

  const collarGeometry = new THREE.CylinderGeometry(0.5, 0.55, 0.2, 32);
  const collarMaterial = new THREE.MeshStandardMaterial({
    color: 0xff0000,
    roughness: 0.7,
    metalness: 0.1,
  });
  const collar = new THREE.Mesh(collarGeometry, collarMaterial);
  collar.position.set(0, 1.35, 0);
  jerseyGroup.add(collar);

  return jerseyGroup;
}

export function createPlayerModel(): THREE.Group {
  const playerGroup = new THREE.Group();

  const headGeometry = new THREE.SphereGeometry(0.4, 32, 32);
  const headMaterial = new THREE.MeshStandardMaterial({
    color: 0xffdbac,
    roughness: 0.8,
  });
  const head = new THREE.Mesh(headGeometry, headMaterial);
  head.position.set(0, 2.2, 0);
  playerGroup.add(head);

  const neckGeometry = new THREE.CylinderGeometry(0.2, 0.25, 0.3, 16);
  const neck = new THREE.Mesh(neckGeometry, headMaterial);
  neck.position.set(0, 1.85, 0);
  playerGroup.add(neck);

  const jerseyGroup = createJerseyGeometry();
  jerseyGroup.position.set(0, 0.3, 0);
  playerGroup.add(jerseyGroup);

  const waistGeometry = new THREE.CylinderGeometry(0.9, 0.85, 0.6, 32);
  const waistMaterial = new THREE.MeshStandardMaterial({
    color: 0x1a1a1a,
    roughness: 0.8,
  });
  const waist = new THREE.Mesh(waistGeometry, waistMaterial);
  waist.position.set(0, -1.3, 0);
  playerGroup.add(waist);

  const leftLegGeometry = new THREE.CylinderGeometry(0.25, 0.22, 1.8, 16);
  const legMaterial = new THREE.MeshStandardMaterial({
    color: 0x1a1a1a,
    roughness: 0.8,
  });
  const leftLeg = new THREE.Mesh(leftLegGeometry, legMaterial);
  leftLeg.position.set(-0.35, -2.5, 0);
  playerGroup.add(leftLeg);

  const rightLeg = new THREE.Mesh(leftLegGeometry, legMaterial.clone());
  rightLeg.position.set(0.35, -2.5, 0);
  playerGroup.add(rightLeg);

  const leftArmGeometry = new THREE.CylinderGeometry(0.15, 0.14, 1.5, 16);
  const armMaterial = new THREE.MeshStandardMaterial({
    color: 0xffdbac,
    roughness: 0.8,
  });
  const leftArm = new THREE.Mesh(leftArmGeometry, armMaterial);
  leftArm.position.set(-1.4, -0.5, 0);
  leftArm.rotation.z = Math.PI / 6;
  playerGroup.add(leftArm);

  const rightArm = new THREE.Mesh(leftArmGeometry, armMaterial.clone());
  rightArm.position.set(1.4, -0.5, 0);
  rightArm.rotation.z = -Math.PI / 6;
  playerGroup.add(rightArm);

  return playerGroup;
}

export function updateJerseyColor(
  jersey: THREE.Group,
  frontTexture: THREE.Texture,
  backTexture: THREE.Texture,
  sleeveTexture: THREE.Texture
): void {
  jersey.children.forEach((child, index) => {
    if (child instanceof THREE.Mesh) {
      if (index === 0) {
        const materials = [
          new THREE.MeshStandardMaterial({ map: sleeveTexture, roughness: 0.7, metalness: 0.1 }),
          new THREE.MeshStandardMaterial({ map: sleeveTexture, roughness: 0.7, metalness: 0.1 }),
          new THREE.MeshStandardMaterial({ map: sleeveTexture, roughness: 0.7, metalness: 0.1 }),
          new THREE.MeshStandardMaterial({ map: sleeveTexture, roughness: 0.7, metalness: 0.1 }),
          new THREE.MeshStandardMaterial({ map: frontTexture, roughness: 0.7, metalness: 0.1 }),
          new THREE.MeshStandardMaterial({ map: backTexture, roughness: 0.7, metalness: 0.1 }),
        ];
        child.material = materials;
      } else {
        child.material = new THREE.MeshStandardMaterial({
          map: sleeveTexture,
          roughness: 0.7,
          metalness: 0.1,
        });
      }
    }
  });
}

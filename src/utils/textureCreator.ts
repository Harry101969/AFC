import * as THREE from 'three';
import { PatternType } from '../types/jersey';

export class TextureCreator {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = 2048;
    this.canvas.height = 2048;
    this.ctx = this.canvas.getContext('2d')!;
  }

  createJerseyTexture(
    color: string,
    logoImg: HTMLImageElement | null,
    frontNumber: string,
    pattern: PatternType
  ): THREE.CanvasTexture {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.applyPattern(pattern, color);

    if (logoImg) {
      const logoSize = 300;
      const logoX = (this.canvas.width - logoSize) / 2;
      const logoY = 600;
      this.ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize);
    }

    this.ctx.fillStyle = '#ffffff';
    this.ctx.strokeStyle = '#000000';
    this.ctx.lineWidth = 4;
    this.ctx.font = 'bold 250px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';

    const numberY = 1100;
    this.ctx.strokeText(frontNumber, this.canvas.width / 2, numberY);
    this.ctx.fillText(frontNumber, this.canvas.width / 2, numberY);

    const texture = new THREE.CanvasTexture(this.canvas);
    texture.needsUpdate = true;
    return texture;
  }

  createBackTexture(
    color: string,
    backName: string,
    backNumber: string,
    pattern: PatternType
  ): THREE.CanvasTexture {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.applyPattern(pattern, color);

    this.ctx.fillStyle = '#ffffff';
    this.ctx.strokeStyle = '#000000';
    this.ctx.lineWidth = 3;

    this.ctx.font = 'bold 140px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.strokeText(backName.toUpperCase(), this.canvas.width / 2, 700);
    this.ctx.fillText(backName.toUpperCase(), this.canvas.width / 2, 700);

    this.ctx.font = 'bold 300px Arial';
    this.ctx.lineWidth = 5;
    this.ctx.strokeText(backNumber, this.canvas.width / 2, 1050);
    this.ctx.fillText(backNumber, this.canvas.width / 2, 1050);

    const texture = new THREE.CanvasTexture(this.canvas);
    texture.needsUpdate = true;
    return texture;
  }

  private applyPattern(pattern: PatternType, baseColor: string): void {
    if (pattern === 'stripes') {
      this.ctx.globalAlpha = 0.15;
      this.ctx.fillStyle = '#000000';
      const stripeWidth = 80;
      for (let i = 0; i < this.canvas.width; i += stripeWidth * 2) {
        this.ctx.fillRect(i, 0, stripeWidth, this.canvas.height);
      }
      this.ctx.globalAlpha = 1.0;
    } else if (pattern === 'diagonal') {
      this.ctx.globalAlpha = 0.15;
      this.ctx.strokeStyle = '#000000';
      this.ctx.lineWidth = 40;
      for (let i = -this.canvas.height; i < this.canvas.width; i += 150) {
        this.ctx.beginPath();
        this.ctx.moveTo(i, 0);
        this.ctx.lineTo(i + this.canvas.height, this.canvas.height);
        this.ctx.stroke();
      }
      this.ctx.globalAlpha = 1.0;
    } else if (pattern === 'texture') {
      this.ctx.globalAlpha = 0.1;
      this.ctx.fillStyle = '#ffffff';
      for (let y = 0; y < this.canvas.height; y += 20) {
        for (let x = 0; x < this.canvas.width; x += 20) {
          if (Math.random() > 0.5) {
            this.ctx.fillRect(x, y, 10, 10);
          }
        }
      }
      this.ctx.globalAlpha = 1.0;
    }
  }

  createSleeveTexture(color: string): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 15;
    ctx.globalAlpha = 0.8;
    ctx.beginPath();
    ctx.moveTo(50, canvas.height);
    ctx.lineTo(50, 50);
    ctx.lineTo(canvas.width - 50, 50);
    ctx.lineTo(canvas.width - 50, canvas.height);
    ctx.stroke();
    ctx.globalAlpha = 1.0;

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }
}

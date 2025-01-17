/// <reference path="babylon.d.ts" />

module SOUNDS {
	export class Basics {
		/*
		* Public members
		*/
		
		/*
		* Private members
		*/
		private _canvas: HTMLCanvasElement;
		private _engine: BABYLON.Engine;
		private _scene: BABYLON.Scene;
		private _camera: BABYLON.FreeCamera;
		private _light: BABYLON.PointLight;
		
		private _plane: BABYLON.Mesh;
		private _box: BABYLON.Mesh;
		
		private _sound2D: BABYLON.Sound;
		private _sound3D: BABYLON.Sound;
		
		constructor(canvas: HTMLCanvasElement) {
			// Engine
			this._engine = new BABYLON.Engine(canvas);
			
			// Scene
			this._scene = new BABYLON.Scene(this._engine);
			
			// Camera
			this._camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(29, 13, 23), this._scene);
			this._camera.setTarget(new BABYLON.Vector3(0, 0, 0));
			this._camera.attachControl(canvas);
			
			// Light
			this._light = new BABYLON.PointLight("Omni", new BABYLON.Vector3(-60, 60, 80), this._scene);
			this._light.intensity = 1;
		}
		
		/**
		* Runs the engine render loop
		*/
		public runRenderLoop(): void {
			this._engine.runRenderLoop(() => {
				this._scene.render();
			});
		}
		
		/**
		* Creates the sounds (2D & 3D)
		*/
		public createSounds(): void {
			// Create a 2D Sound and handle the readyToPlay callback
			this._sound2D = new BABYLON.Sound("Sound2D", "sound2d.mp3", this._scene, () => {
				this._sound2D.play();
			}, { loop: true, autoplay: false, volume: 1, playbackRate: 1 });
			
			// Create a 3D Sound
			this._sound3D = new BABYLON.Sound("Sound3D", "violons11.wav", this._scene, () => {
				
			}, { loop: true, autoplay: true, volume: 1, spatialSound: true, distanceModel: "linear" });
			
			// Set 3D sound's position
			this._sound3D.setPosition(new BABYLON.Vector3(0, 0, 0));
			
			// Set 3D sound's max distance (linear model)
			this._sound3D.maxDistance = 10;
		}
		
		/**
		* Configures collisions in scene with gravity and ellipsoid
		*/
		public createCollisions() : void {
			// Enable collisions in scene
			this._scene.collisionsEnabled = true;
			
			// Enable gravity on camera
			this._camera.applyGravity = true;
			
			// Configure camera to check collisions
			this._camera.checkCollisions = true;
			
			// Configure camera's ellipsoid
			this._camera.ellipsoid = new BABYLON.Vector3(1, 1.8, 1);
			
			// Configure gravity in scene
			this._scene.gravity = new BABYLON.Vector3(0, -0.03, 0);
			
			// Enable collisions on plane and box
			this._plane.checkCollisions = true;
			this._box.checkCollisions = true;
		}
		
		/**
		* Creates a scene with a plane and 6 spheres
		*/
		public createScene(): void {
			// Textures
			var diffuseTexture = new BABYLON.Texture("floor_diffuse.png", this._scene);
			diffuseTexture.vScale = diffuseTexture.uScale = 5.0;
			
			var bumpTexture = new BABYLON.Texture("floor_bump.png", this._scene);
			bumpTexture.vScale = bumpTexture.uScale = 5.0;
			
			var boxTexture = new BABYLON.Texture("wood.jpg", this._scene);
			
			// Materials
			var planeMaterial = new BABYLON.StandardMaterial("plane_material", this._scene);
			planeMaterial.diffuseTexture = diffuseTexture;
			planeMaterial.bumpTexture = bumpTexture;
			
			var boxMaterial = new BABYLON.StandardMaterial("box_material", this._scene);
			boxMaterial.diffuseTexture = boxTexture;
			
			// Meshes
			this._plane = BABYLON.Mesh.CreateGround("ground", 100, 100, 2, this._scene);
			this._plane.material = planeMaterial;
			
			this._box = BABYLON.Mesh.CreateBox("box", 5, this._scene);
			this._box.refreshBoundingInfo();
			this._box.position.y = 2.5;
			this._box.material = boxMaterial;
		}
	}
	
}
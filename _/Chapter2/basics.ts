/// <reference path="babylon.d.ts" />

module BASICS {
	
	/*
	* The keyword "export" is used to tell the TypeScript compiler to make
	* the class "visible" in the window scope
	*/
	export class BasicScene {
		/*
		* Public members
		*/
		public camera: BABYLON.ArcRotateCamera;
		public light: BABYLON.PointLight;
		public box: BABYLON.Mesh;
		
		/*
		* Private members
		*/
		private _canvas: HTMLCanvasElement;
		private _engine: BABYLON.Engine;
		private _scene: BABYLON.Scene;
		
		constructor(canvas: HTMLCanvasElement) {
			// Engine
			this._engine = new BABYLON.Engine(canvas);
			
			// Scene
			this._scene = new BABYLON.Scene(this._engine);
			
			// Camera
			this.camera = new BABYLON.ArcRotateCamera("camera", 0, 0, 30, BABYLON.Vector3.Zero(), this._scene);
			this.camera.attachControl(canvas, true); 
			
			// Light
			this.light = new BABYLON.PointLight("light", new BABYLON.Vector3(20, 20, 20), this._scene);
			this.light.diffuse = new BABYLON.Color3(0, 1, 0);
			this.light.specular = new BABYLON.Color3(1, 0, 1);
			this.light.intensity = 1.0;
			
			// Cube
			this.box = BABYLON.Mesh.CreateBox("cube", 5, this._scene);
		}
		
		/*
		* Use graphs.The new parent of the light is the camera.
		* Then, the light's position will be the same as the camera
		*/
		public setCameraParentOfLight(): void {
			this.light.position = BABYLON.Vector3.Zero();
			this.light.parent = this.camera;
		}
		
		/*
		* The render loop
		* The render loop is called every frame (60 per second) which renders the scene
		*/
		public runRenderLoop(): void {
			this._engine.runRenderLoop(() => {
				this._scene.render();
			});
		}
	}
	
}
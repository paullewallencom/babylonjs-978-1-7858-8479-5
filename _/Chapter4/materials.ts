/// <reference path="babylon.d.ts" />

module MATERIALS {
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
		private _camera: BABYLON.ArcRotateCamera;
		private _light: BABYLON.PointLight;
		
		constructor(canvas: HTMLCanvasElement) {
			// Engine
			this._engine = new BABYLON.Engine(canvas);
			
			// Scene
			this._scene = new BABYLON.Scene(this._engine);
			this._scene.fogEnabled = true; // Fog is enabled in the scene
			this._scene.fogMode = BABYLON.Scene.FOGMODE_EXP; // Linear fog
			this._scene.fogColor = new BABYLON.Color3(1, 1, 1); // White
			this._scene.fogDensity = 0.005;
			
			// Camera
			this._camera = new BABYLON.ArcRotateCamera("camera", 0, 0, 150, BABYLON.Vector3.Zero(), this._scene);
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
		* Creates a scene with a plane and 6 spheres
		*/
		public createScene(): void {
			/**
			* Meshes
			*/
			// Plane
			var plane = this._createPlane();
			
			// Spheres
			var spheres = this._createSpheres();
			
			// Skybox
			var skybox = this._createSkybox();
			
			/**
			* Mirror texture
			*/
			// Mirror texture
			var mirrorTexture = new BABYLON.MirrorTexture("mirrorTexture", 1024, this._scene);
			mirrorTexture.mirrorPlane = BABYLON.Plane.FromPositionAndNormal(new BABYLON.Vector3(0, -5, 0), new BABYLON.Vector3(0, -1, 0));
			// Set meshes and remove plane + skybox
			for (var i=0; i < spheres.length; i++) {
				mirrorTexture.renderList.push(spheres[i]);
			}
			// Apply mirror texture
			(<BABYLON.StandardMaterial>plane.material).reflectionTexture = mirrorTexture;
		}
		
		/**
		* Creates a plane with a normal map texture
		*/
		private _createPlane(): BABYLON.Mesh {
			var material = new BABYLON.StandardMaterial("planeMaterial", this._scene);
			material.diffuseTexture = this._configureTexture(new BABYLON.Texture("floor_diffuse.png", this._scene));
			material.bumpTexture = this._configureTexture(new BABYLON.Texture("floor_bump.png", this._scene));
			material.fogEnabled = false;
			
			var plane = BABYLON.Mesh.CreatePlane("plane", 150, this._scene);
			plane.material = material;
			plane.position.y -= 5;
			plane.rotation.x = Math.PI / 2;
			
			return plane;
		}
		
		/**
		* Creates 7 spheres with different materials 
		*/
		private _createSpheres(): BABYLON.Mesh[] {
			var spheres: BABYLON.Mesh[] = [];
			var initialX = 70;
			
			for (var i=0; i < 7; i++) {
				var sphere = BABYLON.Mesh.CreateSphere("sphere" + i, 10, 9, this._scene);
				sphere.position.x = (initialX -= 15);
				sphere.material = new BABYLON.StandardMaterial("sphereMaterial" + i, this._scene);
				(<BABYLON.StandardMaterial>sphere.material).fogEnabled = true;
				spheres.push(sphere);
			}
			
			// Material 1 (diffuse color)
			var material1 = <BABYLON.StandardMaterial>spheres[0].material;
			material1.diffuseColor = new BABYLON.Color3(1, 0, 0);
			
			// Material 2 (Texture with alpha)
			var material2 = <BABYLON.StandardMaterial>spheres[1].material;
			material2.diffuseTexture = new BABYLON.Texture("cloud.png", this._scene);
			material2.diffuseTexture.hasAlpha = true;
			
			// Material 3 (Alpha)
			var material3 = <BABYLON.StandardMaterial>spheres[2].material;
			material3.specularColor = new BABYLON.Color3(0, 1, 0);
			material3.specularPower = 10;
			material3.useSpecularOverAlpha = true;
			material3.alpha = 0.5;
			
			// Mateiral 4 (back face culling)
			var material4 = <BABYLON.StandardMaterial>spheres[3].material;
			material4.diffuseTexture = material2.diffuseTexture;
			material4.backFaceCulling = false;
			
			// Material 5 (textures repeat)
			var material5 = <BABYLON.StandardMaterial>spheres[4].material;
			material5.diffuseTexture = this._configureTexture(new BABYLON.Texture("cloud.png", this._scene));
			material5.diffuseTexture.hasAlpha = true;
			
			// Material 6 (texture)
			var material6 = <BABYLON.StandardMaterial>spheres[5].material;
			material6.diffuseTexture = new BABYLON.Texture("floor_ao.png", this._scene);
			
			// Material 7 (share the same material as the plane)
			spheres[6].material = this._scene.getMeshByName("plane").material;
			
			return spheres;
		}
		
		private _createSkybox(): BABYLON.Mesh {
			var material = new BABYLON.StandardMaterial("skyboxMaterial", this._scene);
			material.reflectionTexture = new BABYLON.CubeTexture("skybox/TropicalSunnyDay", this._scene);
			material.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
			material.backFaceCulling = false;
			material.fogEnabled = false;
			
			var skybox = BABYLON.Mesh.CreateBox("skybox", 300, this._scene);
			skybox.material = material;
			
			return skybox;
		}
		
		/*
		* Configures a given texture
		* Changes the uv scaling
		*/
		private _configureTexture(texture: BABYLON.Texture): BABYLON.Texture {
			texture.vScale = texture.uScale = 5;
			
			return texture;
		}
	}
	
}
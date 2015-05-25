THREE = require('three');
var RetractableSphere = require('./');
var View = require('threejs-managed-view').View;

var view = new View({
	useRafPolyfill: false,
});
view.renderer.setClearColor(0x7f7f7f);
var scene = view.scene;
var camera = view.camera;
camera.position.multiplyScalar(0.3);
var center = new THREE.Vector3();

view.renderManager.onEnterFrame.add(function() {
	var time = (new Date()).getTime();
	var animValue = time * 0.001;
	camera.position.x = Math.cos(animValue);
	camera.lookAt(center);
	sphere.material.uniforms.color.value.setRGB(Math.cos(animValue)*5, Math.cos(animValue)*5, Math.cos(animValue)*5);
	sphere.material.uniforms.fullness.value = Math.cos(animValue) * 0.5 + 0.5;
	
})

var sphere = new RetractableSphere(32, 16, {
	side: THREE.BackSide,
	wireframe: true,
	// blending: THREE.AdditiveBlending
});
var sphere2 = new RetractableSphere(32, 16, {
	wireframe: true,
	// blending: THREE.AdditiveBlending
});

sphere.position.x = -1;
sphere2.position.x = 1;

scene.add(sphere);
scene.add(sphere2);
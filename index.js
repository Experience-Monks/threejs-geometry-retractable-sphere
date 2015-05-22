var Material = require('./Material');
var Geometry = require('./Geometry');

function RetractableSphereMesh(segsU, segsV, material) {
	if(!(material instanceof THREE.Material)) {
		material = new Material(material);
	}

	var radius = material.uniforms.radius.value;

	THREE.Mesh.call(this, 
		new Geometry(segsU, segsV), 
		material
	);

	this.geometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(), radius);
	this.geometry.boundingBox = new THREE.Box3(
		new THREE.Vector3(-radius, -radius, -radius),
		new THREE.Vector3(radius, radius, radius)
	);
}

RetractableSphereMesh.prototype = Object.create(THREE.Mesh.prototype);

module.exports = RetractableSphereMesh;
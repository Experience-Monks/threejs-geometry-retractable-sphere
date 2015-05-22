var md5 = require('js-md5');
var clone = require('clone');
var geometryDataShared = { 
	"vertices" : [],
	"faces" : [],
	"faceVertexUvs" : []
};

var __geometryCache = {};
function __getGeometry(instance, segsU, segsV) {
	var hash = md5('su:' + segsU + ',sv:' + segsV);
	if(!__geometryCache[hash]) {
		THREE.Geometry.call(instance);
		var geometryData = __getGeometryData(segsU, segsV);
		instance.vertices = geometryData.vertices;
		instance.faces = geometryData.faces;
		instance.faceVertexUvs = geometryData.faceVertexUvs;
		__geometryCache[hash] = instance;
	}
	return __geometryCache[hash];
}

var __geometryDataCache = {};
function __getGeometryData(segsU, segsV) {
	var hash = md5('su:' + segsU + ',sv:' + segsV);
	if(!__geometryDataCache[hash]) {
		var geometryData = clone(geometryDataShared);
		var total = segsU * segsV;
		var vertices = geometryData.vertices;
		var uvData = [];
		for (var iV = 0; iV < segsV; iV++) {
			var ratioV = iV / segsV;
			for (var iU = 0; iU < segsU; iU++) {
				var uv = new THREE.Vector2(iU/(segsU-1), ratioV);
				vertices.push(new THREE.Vector3(uv.x * Math.PI, uv.y * Math.PI * 2, 0));
				uvData.push(uv);
			};
		};
		var faces = geometryData.faces;
		var indicesQuad = [];
		for (var iV = 1; iV <= segsV; iV++) {
			for (var iU = 1; iU < segsU; iU++) {
				var vA = iV % segsV;
				var uA = iU;
				var vB = iV - 1;
				var uB = iU - 1;
				var uvaa = vA * segsU + uA;
				var uvab = vB * segsU + uA;
				var uvba = vA * segsU + uB;
				var uvbb = vB * segsU + uB;
				faces.push(
					new THREE.Face3(uvab, uvaa, uvba),
					new THREE.Face3(uvba, uvbb, uvab)
				);
			}
		}

		var uvs = [];
		geometryData.faceVertexUvs[0] = uvs;
		faces.forEach(function(face){
			uvs.push([uvData[face.a], uvData[face.b], uvData[face.c]]);
		})
		__geometryDataCache[hash] = geometryData;
	}
	return __geometryDataCache[hash];
}

function RetractableSphereGeometry(segsU, segsV) {
	return __getGeometry(this, segsU, segsV);
}

RetractableSphereGeometry.prototype = Object.create(THREE.Geometry.prototype);

module.exports = RetractableSphereGeometry;
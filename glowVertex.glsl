varying vec3 vertexNormal;

void main() {
    vertexNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = 100.0; // Adjust as needed for glow size
}

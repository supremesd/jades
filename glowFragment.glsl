varying vec3 vertexNormal;

void main() {
    float intensity = pow(max(0.0, 0.4 - dot(vertexNormal, vec3(0, 0, 1.0))), 4.0);
    gl_FragColor = vec4(0.88, 0.15, 0.15, 1.0) * intensity; 
}

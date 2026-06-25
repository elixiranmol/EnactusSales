/* ═══════════════════════════════════════════════════════════
   DEV NAGRI — Vanilla Shader Gradient Background
   Ported from shadergradient WebGL logic for pure performance
   ═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // Only run if canvas exists and no reduced motion
  const canvas = document.getElementById('shader-gradient-bg');
  if (!canvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    if (canvas) canvas.style.display = 'none';
    return;
  }

  // --- THREE.JS SETUP ---
  const scene = new THREE.Scene();

  // We use an Orthographic camera because we want the plane to fill the screen flatly
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
  camera.position.z = 1;

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
    powerPreference: "high-performance"
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // --- GEOMETRY ---
  // Plane with many segments for smooth vertex displacement
  const geometry = new THREE.PlaneGeometry(2.5, 2.5, 128, 128);

  // --- SHADERS ---
  const vertexShader = `
    // Simplex 3D Noise (from glsl-noise)
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
    vec3 fade(vec3 t) { return t*t*t*(t*(t*6.0-15.0)+10.0); }

    float cnoise(vec3 P) {
      vec3 Pi0 = floor(P); // Integer part for indexing
      vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
      Pi0 = mod289(Pi0);
      Pi1 = mod289(Pi1);
      vec3 Pf0 = fract(P); // Fractional part for interpolation
      vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
      vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
      vec4 iy = vec4(Pi0.yy, Pi1.yy);
      vec4 iz0 = Pi0.zzzz;
      vec4 iz1 = Pi1.zzzz;

      vec4 ixy = permute(permute(ix) + iy);
      vec4 ixy0 = permute(ixy + iz0);
      vec4 ixy1 = permute(ixy + iz1);

      vec4 gx0 = ixy0 * (1.0 / 7.0);
      vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
      gx0 = fract(gx0);
      vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
      vec4 sz0 = step(gz0, vec4(0.0));
      gx0 -= sz0 * (step(0.0, gx0) - 0.5);
      gy0 -= sz0 * (step(0.0, gy0) - 0.5);

      vec4 gx1 = ixy1 * (1.0 / 7.0);
      vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
      gx1 = fract(gx1);
      vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
      vec4 sz1 = step(gz1, vec4(0.0));
      gx1 -= sz1 * (step(0.0, gx1) - 0.5);
      gy1 -= sz1 * (step(0.0, gy1) - 0.5);

      vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
      vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
      vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
      vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
      vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
      vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
      vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
      vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

      vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
      g000 *= norm0.x; g010 *= norm0.y; g100 *= norm0.z; g110 *= norm0.w;
      vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
      g001 *= norm1.x; g011 *= norm1.y; g101 *= norm1.z; g111 *= norm1.w;

      float n000 = dot(g000, Pf0);
      float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
      float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
      float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
      float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
      float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
      float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
      float n111 = dot(g111, Pf1);

      vec3 fade_xyz = fade(Pf0);
      vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
      vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
      float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
      return 2.2 * n_xyz;
    }

    // Uniforms
    uniform float uTime;
    uniform float uSpeed;
    uniform float uNoiseDensity;
    uniform float uNoiseStrength;

    // Varyings
    varying vec3 vPos;

    void main() {
      float t = uTime * uSpeed;
      vec3 noisePos = position * uNoiseDensity;
      float distortion = cnoise(noisePos + t) * uNoiseStrength;

      // Displace position along Z using noise
      vec3 pos = position;
      pos.z += distortion;
      
      vPos = pos;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = `
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;

    varying vec3 vPos;

    void main() {
      // Color mixing based on displaced position
      // Using smoothstep to interpolate between colors based on vertex X and Z
      vec3 finalColor = mix(
        mix(uColor1, uColor2, smoothstep(-1.0, 1.0, vPos.x)), 
        uColor3, 
        smoothstep(-0.5, 0.5, vPos.y + vPos.z)
      );

      // Add a slight noise/grain to reduce banding
      float grain = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) * 0.03;
      
      gl_FragColor = vec4(finalColor + grain, 1.0); // Opaque to act as the main background
    }
  `;

  // --- MATERIAL ---
  // Using Dev Nagri brand colors
  // Ivory: #F5F0E8 -> RGB(245, 240, 232)
  // Bamboo: #D8C59A -> RGB(216, 197, 154)
  // Copper: #A0622A -> RGB(160, 98, 42)
  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uSpeed: { value: 0.2 },          // Smooth cinematic speed
      uNoiseDensity: { value: 1.5 },    // Elegant waves
      uNoiseStrength: { value: 0.5 },   // Dramatic 3D displacement
      
      uColor1: { value: new THREE.Color('#1A1612') }, // Dusk (Deepest Brown/Black)
      uColor2: { value: new THREE.Color('#4A2211') }, // Deep Terracotta
      uColor3: { value: new THREE.Color('#A0622A') }, // Copper (Highlight)
    },
    wireframe: false,
    transparent: false
  });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // --- RESIZE ---
  function resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    renderer.setSize(width, height);
    
    // Maintain aspect ratio coverage for the plane
    const aspect = width / height;
    mesh.scale.set(aspect > 1 ? aspect : 1, aspect > 1 ? 1 : 1 / aspect, 1);
  }
  window.addEventListener('resize', resize);
  resize();

  // --- ANIMATION LOOP ---
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    material.uniforms.uTime.value = clock.getElapsedTime();
    renderer.render(scene, camera);
  }

  animate();

})();

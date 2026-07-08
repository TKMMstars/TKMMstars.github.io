// 1. 기본 씬, 카메라, 렌더러 설정
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000); // 칠흑 같은 어둠

// 안개 효과를 주어 멀리 있는 것이 안 보이게 함 (공포감 조성)
scene.fog = new THREE.Fog(0x000000, 1, 15);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.y = 1.6; // 플레이어의 눈높이

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 2. 조명 (손전등 효과)
// 기본 환경광은 아주 약하게 설정
const ambientLight = new THREE.AmbientLight(0x111111); 
scene.add(ambientLight);

// 카메라에 손전등(SpotLight) 달기
const flashLight = new THREE.SpotLight(0xffffff, 2, 20, Math.PI / 6, 0.5, 1);
camera.add(flashLight);
flashLight.position.set(0, 0, 1);
flashLight.target = new THREE.Object3D();
flashLight.target.position.set(0, 0, -1);
camera.add(flashLight.target);
scene.add(camera);

// 3. 환경 (간단한 방 만들기)
const floorGeometry = new THREE.PlaneGeometry(20, 20);
const floorMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

// 4. 1인칭 컨트롤러 설정 (마우스 잠금)
const controls = new THREE.PointerLockControls(camera, document.body);
document.addEventListener('click', () => {
    controls.lock(); // 화면 클릭 시 마우스 숨기고 시야 조작 시작
});

// 5. 'chlwhdghk' 암호 입력 감지 로직
let inputBuffer = "";
const targetPassword = "chlwhdghk";

window.addEventListener('keydown', (event) => {
    // 플레이어가 타이핑하는 글자 누적
    if (event.key.length === 1 && event.key.match(/[a-z]/i)) {
        inputBuffer += event.key.toLowerCase();
        console.log("현재 입력: " + inputBuffer);
        
        // 정답 확인
        if (inputBuffer.includes(targetPassword)) {
            alert("암호 입력 완료! 최종화 엔딩 진입!");
            inputBuffer = ""; // 초기화
            // 이곳에 점프스케어나 엔딩 씬으로 넘어가는 코드를 추가합니다.
        }
        
        // 너무 길어지면 초기화 (메모리 및 오작동 방지)
        if (inputBuffer.length > 20) {
            inputBuffer = inputBuffer.substring(inputBuffer.length - 9);
        }
    }
});

// 6. 게임 루프 (매 프레임마다 화면 렌더링)
function animate() {
    requestAnimationFrame(animate);
    
    // 이 부분에 키보드(W, A, S, D)를 통한 이동 로직을 추가하면 됩니다.
    
    renderer.render(scene, camera);
}
animate();

// 창 크기 조절 대응
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

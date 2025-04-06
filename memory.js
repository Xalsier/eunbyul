const englishMemories = [
  { text: "Don't fucking touch her again.", source: 'Moss', mood: 'good' },
  { text: 'I will throw you to those "demons" myself.', source: 'Richard', mood: 'neutral' },
  { text: 'You have a lot of ego for a child', source: 'Cassandra', mood: 'neutral' },
  { text: 'You have no room to talk.', source: 'Alice', mood: 'negative' },
  { text: 'You don’t know what loss is.', source: 'Riley', mood: 'negative' },
  { text: 'YOU WEREN’T THERE!', source: 'Riley', mood: 'negative' },
  { text: 'YOU DIDN’T SEE WHAT WE SAW! ', source: 'Riley', mood: 'negative' },
  { text: 'YOU DIDN’T LOSE WHAT WE LOST!', source: 'Riley', mood: 'negative' },
  { text: "You think you have it all figured out, don’t you?", source: 'Riley', mood: 'negative' },
  { text: "THEN come talk to me about what I should have done.", source: 'Riley', mood: 'negative' },
  { text: 'Don’t worry about her.', source: 'Kellan', mood: 'negative' },
  { text: 'All I know about you is that you hurt others.', source: 'Alice', mood: 'negative' },
  { text: "Same league as a fucking murder clown.", source: 'Eun-byul', mood: 'negative' }
];

const koreanMemories = [
  { text: '♪♪ 비가 내리고 음악이 흐르면♪♪ ', source: 'Kim Hyunshik', mood: 'music' },
  { text: '♪♪ 난 당신을 생각해요, oh ♪♪', source: 'Kim Hyunshik', mood: 'music' },
  { text: '♪♪ 당신이 떠나시던 그 밤에 ♪♪', source: 'Kim Hyunshik', mood: 'music' },
  { text: '♪♪ 이렇게 비가 왔어요 ♪♪', source: 'Kim Hyunshik', mood: 'music' }
];

const pastMemories = [
  { text: '"She never came back that day~"', source: 'Archive #19', mood: 'negative' },
  { text: '"They said it was an accident —"', source: 'Report B12', mood: 'negative' },
  { text: '"He remembers the smell of smoke, always the smoke~"', source: 'Memory Residue', mood: 'negative' }
];

const distortionMatrix = {
    A: {
        allCaps: 0.55,
        repeat: 0.10
    },
    B: {
      allCaps: 0.75,
      repeat: 0.10
    },
    C: {
      allCaps: 0.10,
      blockChar: 0.25,
      blockDash: 0.25,
      repeat: 0.25
    }
  };
  

function maybeTruncate(sentence) {
  if (Math.random() < 0.5) {
    const rand = Math.random();
    let fraction = 1;
    if (rand < 0.6) fraction = 0.5;
    else if (rand < 0.8) fraction = 0.25;
    const newLength = Math.floor(sentence.length * fraction);
    return sentence.slice(0, newLength);
  }
  return sentence;
}

function applyDistortions(text, level) {
  const matrix = distortionMatrix[level];
  let result = text;

  if (matrix.allCaps && Math.random() < matrix.allCaps) {
    result = result.toUpperCase();
  }

  if (matrix.blockChar && Math.random() < matrix.blockChar) {
    result = result.replace(/[\w]/g, (c) => Math.random() < 0.1 ? '█' : c);
  }

  if (matrix.blockDash && Math.random() < matrix.blockDash) {
    result = result.replace(/[\w]/g, (c) => Math.random() < 0.1 ? '-' : c);
  }

  if (matrix.repeat && Math.random() < matrix.repeat) {
    result = result.replace(/(\w)/g, (c) => Math.random() < 0.1 ? c + c : c);
  }

  if (matrix.spaced && Math.random() < matrix.spaced) {
    result = result.replace(/(\w)/g, (c) => Math.random() < 0.1 ? c + ' ' : c);
  }

  return result;
}

function scrambleMemory(level) {
  let total = 3, numEnglish = 2, numKorean = 1, numPast = 0;
  if (level === 'B') {
    total = 5;
    numEnglish = 2;
    numKorean = 3;
  } else if (level === 'C') {
    total = 8;
    numPast = 1;
    numKorean = total - numPast;
    numEnglish = 0;
  }

  const sourceOrder = [];
  const fragments = [];

  function addMemory(memList) {
    const item = memList[Math.floor(Math.random() * memList.length)];
    const distorted = applyDistortions(maybeTruncate(item.text), level);
    const className = `memory-fragment memory-${item.mood || 'neutral'}`;
    fragments.push(`<span class="${className}">${distorted}</span>`);
    sourceOrder.push(item.source);
  }

  for (let i = 0; i < numEnglish; i++) addMemory(englishMemories);
  for (let i = 0; i < numKorean; i++) addMemory(koreanMemories);
  for (let i = 0; i < numPast; i++) addMemory(pastMemories);

  // Shuffle memories but keep track of order
  const combined = fragments.map((frag, i) => ({ frag, source: sourceOrder[i] }));
  combined.sort(() => Math.random() - 0.5);

  // Inject memory text
  document.getElementById('textFeed').innerHTML = combined.map(item => item.frag).join(' ');

  // Build and inject source log
  const sourceLog = document.getElementById('sourceLog');
  sourceLog.innerHTML = '';
  combined.forEach((item, i) => {
    const sourceDiv = document.createElement('div');
    sourceDiv.classList.add('source-item');
    sourceDiv.textContent = `#${i + 1}: ${item.source}`;
    sourceDiv.style.color = getComputedStyle(document.querySelectorAll('.memory-fragment')[i]).color;
    sourceLog.appendChild(sourceDiv);
  });
}




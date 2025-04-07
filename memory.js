const characterMemories = [
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
  
  const bookMemories = [
    // Paulo Freire
    { text: 'Human in the process of achieving freedom.', source: 'Paulo Freire', mood: 'neutral' },
    { text: 'A limiting situation which they can transform.', source: 'Paulo Freire', mood: 'neutral' },
    { text: 'The discovery of the oppressed of the conditions for liberation.', source: 'Paulo Freire', mood: 'neutral' },
    { text: 'Rationalizing his guilt through paternalistic treatment.', source: 'Paulo Freire', mood: 'neutral' },
    { text: 'A radical posture.', source: 'Paulo Freire', mood: 'neutral' },
    { text: 'True solidarity with the oppressed means fighting at their side.', source: 'Paulo Freire', mood: 'neutral' },
    { text: 'Immobility, like a patient waiting for the sickness to leave.', source: 'Paulo Freire', mood: 'neutral' },
    { text: 'Oppressive reality absorbs those within it. Oppression is domesticating.', source: 'Paulo Freire', mood: 'neutral' },
    { text: 'What is beneficial for the oppressor is for the oppressed to be impotent in the face of the reality.', source: 'Paulo Freire', mood: 'neutral' },
  
    // Karl Marx
    { text: 'One section of the French Legitimists and “Young England” exhibited this spectacle.', source: 'Karl Marx', mood: 'neutral' },
    { text: 'Society can no longer live under this bourgeoisie.', source: 'Karl Marx', mood: 'neutral' },
    { text: 'But every class struggle is a political struggle.', source: 'Karl Marx', mood: 'neutral' },
    { text: 'It must nestle everywhere, settle everywhere, establish connections everywhere.', source: 'Karl Marx', mood: 'neutral' },
    { text: 'Political power, properly so called, is merely the organized power of one class for oppressing another.', source: 'Karl Marx', mood: 'neutral' },
    { text: 'The ruling ideas of each age have only been the ideas of its ruling class.', source: 'Karl Marx', mood: 'neutral' },
    { text: 'Man’s ideas, views, conceptions—in one word, man’s consciousness—changes with every change in his material conditions.', source: 'Karl Marx', mood: 'neutral' }
  ];
  
  const musicMemories = [];
  const movieMemories = [];
  
  const mercuryMemories = [
    { text: '████████████', source: '???', mood: 'negative' },
    { text: '████████████', source: '???', mood: 'negative' },
    { text: '████████████', source: '???', mood: 'negative' }
  ];
  
  const memoryCategoryMatrix = {
    A: [
      { key: 'character', data: characterMemories, probability: 0.30 },
      { key: 'book', data: bookMemories, probability: 0.25 },
      { key: 'music', data: musicMemories, probability: 0.25 },
      { key: 'movie', data: movieMemories, probability: 0.15 },
      { key: 'mercury', data: mercuryMemories, probability: 0.05 }
    ],
    B: [
      { key: 'character', data: characterMemories, probability: 0.25 },
      { key: 'book', data: bookMemories, probability: 0.20 },
      { key: 'music', data: musicMemories, probability: 0.20 },
      { key: 'movie', data: movieMemories, probability: 0.20 },
      { key: 'mercury', data: mercuryMemories, probability: 0.15 }
    ],
    C: [
      { key: 'character', data: characterMemories, probability: 0.10 },
      { key: 'book', data: bookMemories, probability: 0.10 },
      { key: 'music', data: musicMemories, probability: 0.10 },
      { key: 'movie', data: movieMemories, probability: 0.10 },
      { key: 'mercury', data: mercuryMemories, probability: 0.60 }
    ]
  };
  
  
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
  
  function selectMemoryCategory(level) {
    let categoryList = memoryCategoryMatrix[level].filter(cat => cat.data.length > 0);
    if (categoryList.length === 0) return null;
  
    const totalProb = categoryList.reduce((sum, cat) => sum + cat.probability, 0);
    const r = Math.random() * totalProb;
  
    let cumulative = 0;
    for (let cat of categoryList) {
      cumulative += cat.probability;
      if (r <= cumulative) return cat;
    }
  
    return categoryList[categoryList.length - 1]; // fallback
  }
  
  
  
  function scrambleMemory(level) {
    const totalByLevel = { A: 4, B: 6, C: 8 };
    const total = totalByLevel[level];
  
    const fragments = [];
    const sourceOrder = [];
  
    function addMemory(memList) {
      if (!memList.length) return;
      const item = memList[Math.floor(Math.random() * memList.length)];
      const distorted = applyDistortions(maybeTruncate(item.text), level);
      const className = `memory-fragment memory-${item.mood || 'neutral'}`;
      fragments.push(`<span class="${className}">${distorted}</span>`);
      sourceOrder.push(item.source);
    }
  
    for (let i = 0; i < total; i++) {
      const selected = selectMemoryCategory(level);
      addMemory(selected.data);
    }
  
    const combined = fragments.map((frag, i) => ({ frag, source: sourceOrder[i] }));
    combined.sort(() => Math.random() - 0.5);
  
    // Render fragments
    document.getElementById('textFeed').innerHTML = combined.map(item => item.frag).join(' ');
  
    // Render source log
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
  
  
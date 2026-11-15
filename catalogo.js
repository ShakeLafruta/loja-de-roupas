const outfits = [[1,"Borutochu (DLC2)","fixas"],[2,"Borutochu (DLC1)","fixas"],[3,"Itachi Kid","fixas"],[4,"Kakashi Jounin","fixas"],[5,"Minato Jounin","fixas"],[6,"Naruto Kid","fixas"],[7,"Obito Jounin","fixas"],[8,"Sakura Kid","fixas"],[9,"Sasuke Kid","fixas"],[10,"Shikaku","fixas"],[11,"Yugao (DLC1)","fixas"],[12,"Yugao (DLC2)","fixas"],[14,"Alucard","apoio-developer"],[15,"Athos Chu","apoio-developer"],[16,"Athos Kid","apoio-developer"],[17,"Ayumi","apoio-developer"],[18,"Bueno","apoio-developer"],[19,"Code Minos","apoio-developer"],[20,"Eliza Red","apoio-developer"],[21,"Emily","apoio-developer"],[22,"Eros","apoio-developer"],[23,"Gaara Black","apoio-developer"],[24,"Ghost Emo","apoio-developer"],[25,"Hidan Yakuza","apoio-developer"],[26,"Inaki Hashirama","apoio-developer"],[27,"Indra","apoio-developer"],[28,"Itachi Athos","apoio-developer"],[29,"Itachi Hikaku","apoio-developer"],[30,"Izuna Adao","apoio-developer"],[31,"Itachi Ryodoshel","apoio-developer"],[32,"Kai Chisaki","apoio-developer"],[33,"Kaiser 1","apoio-developer"],[34,"Kaiser 2","apoio-developer"],[35,"Kakatche","apoio-developer"],[36,"Katrina","apoio-developer"],[37,"Kazuo","apoio-developer"],[38,"Kiyomi Gojo","apoio-developer"],[39,"Kiyomi Uchiha","apoio-developer"],[40,"Konan Yakuza","apoio-developer"],[41,"Makima","apoio-developer"],[42,"Minato Yakuza","apoio-developer"],[43,"Metallee Chu","apoio-developer"],[44,"Mingaua","apoio-developer"],[45,"Misaky","apoio-developer"],[46,"Mituskichu (DLC1)","apoio-developer"],[47,"Mituskijou (DLC1)","apoio-developer"],[48,"Mistukijou (DLC2)","apoio-developer"],[49,"Mituskijou (DLC3)","apoio-developer"],[50,"Nagato Kumo","apoio-developer"],[51,"Naruto Ketaro","apoio-developer"],[52,"Naruto Yakuza","apoio-developer"],[53,"Naruto Samurai","apoio-developer"],[54,"Kyojuro","apoio-developer"],[55,"Obito Dark C","apoio-developer"],[56,"Obito Hydan","apoio-developer"],[57,"Okais Emo","apoio-developer"],[58,"Onimaru","apoio-developer"],[59,"Orochimaru Viril","apoio-developer"],[60,"Oroki","apoio-developer"],[61,"Roronoa Hatake","apoio-developer"],[62,"Ryougi Chunin","apoio-developer"],[63,"Samui Yakuza","apoio-developer"],[64,"Saphira","apoio-developer"],[65,"Sarutobi Zeke","apoio-developer"],[66,"Sasuke Darkc","apoio-developer"],[67,"Sasuke Hisake","apoio-developer"],[68,"Sasuke Hydan","apoio-developer"],[69,"Sasuke Shusui","apoio-developer"],[70,"Sasuke Nick","apoio-developer"],[71,"Sasuke Teppei","apoio-developer"],[72,"Sasuke Ulquiorra","apoio-developer"],[73,"Sasuke Zymett","apoio-developer"],[74,"Shinpei Casual","apoio-developer"],[75,"Shisui Yakuza","apoio-developer"],[76,"Takima Anbu","apoio-developer"],[77,"Takima Casual","apoio-developer"],[78,"Tobirama Mitateke","apoio-developer"],[79,"Tomioka","apoio-developer"],[80,"Yahiko Yakuza","apoio-developer"],[81,"Yor","apoio-developer"],[82,"Zangetsu","apoio-developer"],[83,"Yamiryu","apoio-developer"],[84,"Zeron","apoio-developer"],[85,"Kiyomi Apollo","apoio-developer"],[86,"Mituski Kimono","apoio-developer"],[87,"TMSS Casual","apoio-developer"],[88,"Kuromi Genin","apoio-developer"],[89,"Kuromi Genin S","apoio-developer"],[90,"Ao Anbu","apoio-developer"],[91,"Boruto Karma Sage","apoio-developer"],[92,"Sanm","apoio-developer"]];
const categories = { fixas: 'Fixas', 'apoio-developer': 'Apoio Developer' };
const search = document.querySelector('#search');
const collections = document.querySelector('#collections');
const filters = [...document.querySelectorAll('[data-category]')];
const viewer = document.querySelector('#viewer');
const photo = document.querySelector('#photo');
let category = 'todos';
let results = [];
let current = 0;

function normalize(value) {
  return value.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase();
}

function render() {
  const terms = normalize(search.value).trim().split(/\s+/);
  results = outfits.filter(([, name, group]) =>
    (category === 'todos' || category === group) &&
    terms.every(term => normalize(name).includes(term))
  );
  document.querySelector('#count').textContent = results.length === 1 ? '1 traje' : results.length + ' trajes';
  collections.replaceChildren();
  if (!results.length) {
    const message = document.createElement('p');
    message.className = 'empty';
    message.textContent = 'Nenhum traje encontrado. Tente outro nome ou categoria.';
    collections.append(message);
  }
  for (const [group, label] of Object.entries(categories)) {
    const items = results.filter(item => item[2] === group);
    if (!items.length) continue;
    const section = document.createElement('section');
    section.className = 'collection';
    section.innerHTML = '<h3></h3><div class="grid"></div>';
    section.firstElementChild.textContent = label;
    const grid = section.lastElementChild;
    for (const [number, name] of items) {
      const card = document.createElement('button');
      card.className = 'card';
      card.type = 'button';
      card.setAttribute('aria-label', 'Ampliar foto de ' + name);
      card.innerHTML = '<div class="thumb"><img alt="" loading="lazy" width="600" height="540"></div><span class="card-label"><strong></strong><span aria-hidden="true">↗</span></span>';
      card.querySelector('img').src = 'fotos/' + group + '/' + number + '-mini.jpg';
      card.querySelector('strong').textContent = name;
      card.addEventListener('click', () => {
        show(results.findIndex(item => item[0] === number));
        viewer.showModal();
      });
      grid.append(card);
    }
    collections.append(section);
  }
}

function show(index) {
  current = (index + results.length) % results.length;
  const [number, name, group] = results[current];
  document.querySelector('#photo-title').textContent = name;
  document.querySelector('#photo-category').textContent = categories[group];
  document.querySelector('#position').textContent = (current + 1) + ' de ' + results.length;
  photo.alt = 'Traje ' + name;
  photo.src = 'fotos/' + group + '/' + number + '.jpg';
}
for (const filter of filters) {
  filter.addEventListener('click', () => {
    category = filter.dataset.category;
    for (const option of filters) option.setAttribute('aria-pressed', option === filter);
    render();
  });
}
search.addEventListener('input', render);
document.querySelector('#close').onclick = () => viewer.close();
document.querySelector('#previous').onclick = () => show(current - 1);
document.querySelector('#next').onclick = () => show(current + 1);
viewer.addEventListener('click', event => {
  if (event.target === viewer) viewer.close();
});
viewer.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft') show(current - 1);
  if (event.key === 'ArrowRight') show(current + 1);
});
render();


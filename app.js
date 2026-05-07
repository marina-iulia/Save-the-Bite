(() => {
  "use strict";

  const USER_KEY = "saveTheBiteUser";
  const RECIPE_STATE_KEY = "saveTheBiteRecipeState";
  const POST_STATE_KEY = "saveTheBitePostState";
  const REACTION_STATE_KEY = "saveTheBiteReactionState";

  const DEFAULT_USER = {
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+40 123 456 789",
    location: "Bucuresti, Romania",
    bio: "Pasionat de sustenabilitate si de reducerea risipei alimentare. Invat mereu retete noi!"
  };

  const DEFAULT_RECIPES = [
    {
      id: "default-recipe-1",
      title: "Ciorba de Legume Ramase",
      category: "pranz",
      time: "45 min",
      difficulty: "Usor",
      servings: "4 portii",
      summary: "O ciorba reconfortanta preparata din legumele ramase din frigider. Perfecta pentru a folosi resturile!",
      ingredients: ["2 cani legume ramase taiate cuburi", "1 ceapa", "1 morcov", "1 telina mica", "1 litru supa sau apa", "Bors sau zeama de lamaie", "Patrunjel, sare si piper"],
      steps: ["Caleste ceapa, morcovul si telina in putin ulei.", "Adauga legumele ramase si supa, apoi fierbe 30 de minute.", "Potriveste gustul cu bors sau zeama de lamaie.", "Presara patrunjel si serveste calda."]
    },
    {
      id: "default-recipe-2",
      title: "Paine Prajita cu Legume",
      category: "mic-dejun",
      time: "15 min",
      difficulty: "Usor",
      servings: "2 portii",
      summary: "Paine veche transformata intr-un mic dejun savuros cu legume proaspete si oua.",
      ingredients: ["4 felii paine veche", "2 oua", "Rosii sau ardei ramasi", "Branza rasa optional", "Verdeata", "Sare si piper"],
      steps: ["Prajeste usor feliile de paine.", "Bate ouale cu sare, piper si verdeata.", "Adauga legumele tocate si pune amestecul peste paine.", "Coace sau rumeneste in tigaie pana se leaga compozitia."]
    },
    {
      id: "default-recipe-3",
      title: "Biscuiti din Fulgi de Ovaz",
      category: "desert",
      time: "30 min",
      difficulty: "Usor",
      servings: "12 buc",
      summary: "Biscuiti crocanti preparati din fulgi de ovaz si fructe uscate.",
      ingredients: ["2 cani fulgi de ovaz", "2 banane foarte coapte", "3 linguri miere", "Fructe uscate sau nuci", "Scortisoara", "Un praf de sare"],
      steps: ["Paseaza bananele si amesteca-le cu mierea.", "Incorporeaza fulgii de ovaz, fructele uscate si scortisoara.", "Formeaza biscuitii pe o tava cu hartie de copt.", "Coace 18-20 de minute la 180 grade C."]
    },
    {
      id: "default-recipe-4",
      title: "Salata de Coji de Legume",
      category: "pranz",
      time: "20 min",
      difficulty: "Usor",
      servings: "2 portii",
      summary: "O salata ingenioasa din coji de legume bine spalate, asezonate cu dressing.",
      ingredients: ["Coji curate de morcov, cartof sau sfecla", "1 lingura ulei de masline", "1 lingura zeama de lamaie", "Usturoi optional", "Seminte", "Sare si piper"],
      steps: ["Spala foarte bine cojile si taie-le fasii subtiri.", "Opteaza pentru coji de legume sanatoase, fara zone stricate.", "Amesteca dressingul din ulei, lamaie si condimente.", "Combina totul si lasa 5 minute inainte de servire."]
    },
    {
      id: "default-recipe-5",
      title: "Compot din Fructe Trecute",
      category: "desert",
      time: "60 min",
      difficulty: "Mediu",
      servings: "6 portii",
      summary: "Compot delicios din fructe care incep sa fie prea coapte. Perfect pentru iarna!",
      ingredients: ["1 kg fructe foarte coapte", "1 litru apa", "2-3 linguri zahar sau miere", "Scortisoara", "Coaja de lamaie", "Vanilie optional"],
      steps: ["Curata zonele lovite ale fructelor si taie restul in bucati.", "Fierbe apa cu zaharul si aromele.", "Adauga fructele si lasa la foc mic pana se inmoaie.", "Pune compotul in borcane curate sau serveste rece."]
    },
    {
      id: "default-recipe-6",
      title: "Pizza cu Legume Ramase",
      category: "cina",
      time: "40 min",
      difficulty: "Mediu",
      servings: "4 portii",
      summary: "Pizza homemade cu legumele ramase din frigider. O modalitate creativa de a le folosi!",
      ingredients: ["1 blat de pizza", "Sos de rosii", "Legume ramase feliate", "Branza sau cascaval", "Ierburi aromatice", "Ulei de masline"],
      steps: ["Intinde sosul de rosii pe blat.", "Adauga legumele ramase si branza.", "Stropeste cu putin ulei si presara ierburi.", "Coace la 200 grade C pana blatul devine crocant."]
    }
  ];

  const DEFAULT_RECIPE_MAP = DEFAULT_RECIPES.reduce((map, recipe) => {
    map[recipe.id] = recipe;
    return map;
  }, {});

  function readJson(key, fallback) {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : fallback;
    } catch (error) {
      console.warn("Storage read failed for", key, error);
      return fallback;
    }
  }

  function writeJson(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function getUser() {
    return { ...DEFAULT_USER, ...readJson(USER_KEY, {}) };
  }

  function getRecipeState() {
    const state = readJson(RECIPE_STATE_KEY, {});
    return {
      custom: Array.isArray(state.custom) ? state.custom : [],
      overrides: state.overrides || {},
      deleted: Array.isArray(state.deleted) ? state.deleted : []
    };
  }

  function saveRecipeState(state) {
    writeJson(RECIPE_STATE_KEY, state);
  }

  function getPostState() {
    const state = readJson(POST_STATE_KEY, {});
    return {
      custom: Array.isArray(state.custom) ? state.custom : [],
      overrides: state.overrides || {},
      deleted: Array.isArray(state.deleted) ? state.deleted : []
    };
  }

  function savePostState(state) {
    writeJson(POST_STATE_KEY, state);
  }

  function getReactionState() {
    const state = readJson(REACTION_STATE_KEY, {});
    return {
      likes: state.likes || {},
      likedByMe: state.likedByMe || {},
      commentTotals: state.commentTotals || {},
      comments: state.comments || {}
    };
  }

  function saveReactionState(state) {
    writeJson(REACTION_STATE_KEY, state);
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function toInitials(name) {
    const initials = String(name || "")
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
    return initials || "ST";
  }

  function slugify(value) {
    return String(value || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function splitList(value, separator) {
    return String(value || "")
      .split(separator || /\n|,/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  function findProfileForm() {
    if (!document.querySelector(".profile-header")) return null;
    return Array.from(document.querySelectorAll("form")).find((form) =>
      form.querySelector('input[type="email"]') &&
      form.querySelector('input[type="tel"]') &&
      form.querySelector("textarea")
    );
  }

  function updateNavbar() {
    const user = getUser();
    const initials = toInitials(user.name);

    document.querySelectorAll(".user-name").forEach((element) => {
      element.textContent = user.name;
    });

    document.querySelectorAll(".user-email").forEach((element) => {
      element.textContent = user.email;
    });

    document.querySelectorAll(".user-avatar").forEach((element) => {
      element.textContent = initials;
    });
  }

  function renderProfileUser(fillForm = true) {
    const user = getUser();
    updateNavbar();

    const header = document.querySelector(".profile-header");
    if (!header) return;

    const title = header.querySelector("h1");
    if (title) title.textContent = user.name;

    const avatar = header.querySelector(".profile-avatar-large");
    if (avatar) avatar.textContent = toInitials(user.name);

    const locationLine = header.querySelector(".fa-map-marker-alt")?.parentElement;
    if (locationLine) {
      locationLine.innerHTML = `<i class="fas fa-map-marker-alt me-2"></i>${escapeHtml(user.location)}`;
    }

    if (fillForm) {
      const form = findProfileForm();
      if (form) {
        const textInputs = form.querySelectorAll('input[type="text"]');
        const emailInput = form.querySelector('input[type="email"]');
        const phoneInput = form.querySelector('input[type="tel"]');
        const bioInput = form.querySelector("textarea");

        if (textInputs[0]) textInputs[0].value = user.name;
        if (emailInput) emailInput.value = user.email;
        if (phoneInput) phoneInput.value = user.phone;
        if (textInputs[1]) textInputs[1].value = user.location;
        if (bioInput) bioInput.value = user.bio;
      }
    }

    document.querySelectorAll(".profile-header ~ .main-content .forum-post").forEach((post) => {
      const author = post.querySelector(".post-info h4");
      const avatarSmall = post.querySelector(".post-avatar");
      if (author) author.textContent = user.name;
      if (avatarSmall) avatarSmall.textContent = toInitials(user.name);
      post.dataset.owner = "current-user";
    });
  }

  function handleProfileSubmit(event) {
    const form = event.target;
    if (form !== findProfileForm()) return false;

    event.preventDefault();
    event.stopImmediatePropagation();

    const textInputs = form.querySelectorAll('input[type="text"]');
    const emailInput = form.querySelector('input[type="email"]');
    const phoneInput = form.querySelector('input[type="tel"]');
    const bioInput = form.querySelector("textarea");

    const user = {
      name: textInputs[0]?.value.trim() || DEFAULT_USER.name,
      email: emailInput?.value.trim() || DEFAULT_USER.email,
      phone: phoneInput?.value.trim() || DEFAULT_USER.phone,
      location: textInputs[1]?.value.trim() || DEFAULT_USER.location,
      bio: bioInput?.value.trim() || DEFAULT_USER.bio
    };

    writeJson(USER_KEY, user);
    renderProfileUser(false);
    hydrateOwnerMenus();
    showToast("Profilul a fost actualizat.");
    return true;
  }

  function getRecipeData(item) {
    const state = getRecipeState();
    const id = item.dataset.recipeId;
    const fallback = DEFAULT_RECIPE_MAP[id] || {};
    const custom = state.custom.find((recipe) => recipe.id === id) || {};
    const override = state.overrides[id] || {};
    const title = item.querySelector("h4")?.textContent.trim();
    const summary = item.querySelector("p.mb-3")?.textContent.trim();
    return {
      ...fallback,
      ...custom,
      ...override,
      id,
      title: override.title || custom.title || fallback.title || title || "Reteta",
      summary: override.summary || custom.summary || fallback.summary || summary || "",
      ingredients: override.ingredients || custom.ingredients || fallback.ingredients || [],
      steps: override.steps || custom.steps || fallback.steps || [],
      owner: "current-user"
    };
  }

  function recipeMetaHtml(recipe) {
    return `
      <span><i class="fas fa-clock"></i> ${escapeHtml(recipe.time || "30 min")}</span>
      <span><i class="fas fa-fire"></i> ${escapeHtml(recipe.difficulty || "Usor")}</span>
      <span><i class="fas fa-users"></i> ${escapeHtml(recipe.servings || "Utilizator")}</span>
    `;
  }

  function applyRecipeToCard(item, recipe) {
    item.dataset.category = recipe.category || item.dataset.category || "pranz";
    item.dataset.owner = "current-user";

    const title = item.querySelector("h4");
    const meta = item.querySelector(".recipe-meta");
    const summary = item.querySelector("p.mb-3");
    const button = item.querySelector(".recipe-card .btn-success");

    if (title) title.textContent = recipe.title || title.textContent;
    if (meta) meta.innerHTML = recipeMetaHtml(recipe);
    if (summary) summary.textContent = recipe.summary || summary.textContent;
    if (button) button.textContent = "Vezi Reteta";
  }

  function renderRecipeCard(recipe) {
    return `
      <div class="col-md-6 col-lg-4 recipe-item" data-dynamic-recipe="true" data-owner="current-user" data-recipe-id="${escapeHtml(recipe.id)}" data-category="${escapeHtml(recipe.category || "pranz")}">
        <div class="recipe-card">
          <div class="recipe-image" style="background: linear-gradient(135deg, #3F9B45, #1F6B2E);">
            <i class="fas fa-utensils"></i>
          </div>
          <div class="recipe-content">
            <h4>${escapeHtml(recipe.title)}</h4>
            <div class="recipe-meta">${recipeMetaHtml(recipe)}</div>
            <p class="mb-3">${escapeHtml(recipe.summary || "Reteta adaugata de tine.")}</p>
            <button class="btn btn-success w-100">Vezi Reteta</button>
          </div>
        </div>
      </div>
    `;
  }

  function ensureRecipeActions(item) {
    const card = item.querySelector(".recipe-card");
    if (!card || card.querySelector(".item-owner-actions")) return;

    card.insertAdjacentHTML("beforeend", `
      <div class="dropdown item-owner-actions">
        <button class="owner-menu-button" type="button" data-bs-toggle="dropdown" aria-expanded="false" aria-label="Optiuni reteta">
          <i class="fas fa-ellipsis-v"></i>
        </button>
        <ul class="dropdown-menu dropdown-menu-end">
          <li><a class="dropdown-item" href="#" onclick="editItem(this)"><i class="fas fa-edit me-2"></i>Modifica</a></li>
          <li><a class="dropdown-item" href="#" onclick="editItem(this)"><i class="fas fa-sync-alt me-2"></i>Actualizeaza</a></li>
          <li><hr class="dropdown-divider"></li>
          <li><a class="dropdown-item text-danger" href="#" onclick="deleteItem(this)"><i class="fas fa-trash me-2"></i>Sterge</a></li>
        </ul>
      </div>
    `);
  }

  function hydrateRecipes() {
    const recipeItems = document.querySelectorAll(".recipe-item");
    if (!recipeItems.length) return;

    const state = getRecipeState();
    document.querySelectorAll('[data-dynamic-recipe="true"]').forEach((item) => item.remove());

    Array.from(document.querySelectorAll(".recipe-item")).forEach((item, index) => {
      const id = item.dataset.recipeId || `default-recipe-${index + 1}`;
      item.dataset.recipeId = id;

      if (state.deleted.includes(id)) {
        item.remove();
        return;
      }

      const recipe = { ...(DEFAULT_RECIPE_MAP[id] || {}), ...(state.overrides[id] || {}) };
      applyRecipeToCard(item, recipe);
      ensureRecipeActions(item);
    });

    const row = document.querySelector(".recipe-item")?.parentElement || document.querySelector(".main-content .row");
    if (row) {
      state.custom.forEach((recipe) => {
        row.insertAdjacentHTML("beforeend", renderRecipeCard(recipe));
      });
      document.querySelectorAll('[data-dynamic-recipe="true"]').forEach(ensureRecipeActions);
    }
  }

  function showRecipeDetails(item) {
    const modalElement = document.getElementById("recipeDetailsModal");
    if (!modalElement || !window.bootstrap) return;

    const recipe = getRecipeData(item);
    const title = modalElement.querySelector("#modalRecipeTitle");
    const meta = modalElement.querySelector("#modalRecipeMeta");
    const ingredients = modalElement.querySelector("#modalRecipeIngredients");
    const steps = modalElement.querySelector("#modalRecipeSteps");

    if (title) title.textContent = recipe.title;
    if (meta) meta.innerHTML = recipeMetaHtml(recipe);
    if (ingredients) {
      ingredients.innerHTML = recipe.ingredients.length
        ? recipe.ingredients.map((ingredient) => `<li>${escapeHtml(ingredient)}</li>`).join("")
        : "<li>Nu sunt ingrediente salvate inca.</li>";
    }
    if (steps) {
      steps.outerHTML = `
        <ol id="modalRecipeSteps" class="ps-3">
          ${(recipe.steps.length ? recipe.steps : ["Nu sunt pasi salvati inca."]).map((step) => `<li class="mb-2">${escapeHtml(step)}</li>`).join("")}
        </ol>
      `;
    }

    bootstrap.Modal.getOrCreateInstance(modalElement).show();
  }

  function openRecipeEditor(item) {
    const modalElement = document.getElementById("addRecipeModal");
    const form = document.getElementById("addRecipeForm");
    if (!modalElement || !form || !window.bootstrap) return;

    const recipe = getRecipeData(item);
    form.dataset.editingId = recipe.id;
    form.querySelector("#recipeName").value = recipe.title;
    form.querySelector("#recipeCategory").value = recipe.category || "pranz";
    form.querySelector("#recipeTime").value = recipe.time || "";
    form.querySelector("#recipeIngredients").value = (recipe.ingredients || []).join(", ");
    form.querySelector("#recipeSteps").value = (recipe.steps || []).join("\n");

    const title = modalElement.querySelector(".modal-title");
    const submit = form.querySelector('button[type="submit"]');
    if (title) title.textContent = "Actualizeaza Reteta";
    if (submit) submit.textContent = "Actualizeaza Reteta";

    bootstrap.Modal.getOrCreateInstance(modalElement).show();
  }

  function resetRecipeFormMode() {
    const form = document.getElementById("addRecipeForm");
    const modalElement = document.getElementById("addRecipeModal");
    if (!form || !modalElement) return;

    delete form.dataset.editingId;
    form.reset();

    const title = modalElement.querySelector(".modal-title");
    const submit = form.querySelector('button[type="submit"]');
    if (title) title.textContent = "Adauga Reteta Ta";
    if (submit) submit.textContent = "Salveaza Reteta";
  }

  function handleRecipeSubmit(event) {
    const form = event.target;
    if (form.id !== "addRecipeForm") return false;

    event.preventDefault();
    event.stopImmediatePropagation();

    const editingId = form.dataset.editingId;
    const title = form.querySelector("#recipeName")?.value.trim();
    const category = form.querySelector("#recipeCategory")?.value || "pranz";
    const time = form.querySelector("#recipeTime")?.value.trim() || "30 min";
    const ingredients = splitList(form.querySelector("#recipeIngredients")?.value || "");
    const steps = splitList(form.querySelector("#recipeSteps")?.value || "", /\n/);
    const state = getRecipeState();
    const recipe = {
      id: editingId || `recipe-${Date.now()}`,
      title: title || "Reteta mea",
      category,
      time,
      difficulty: "Usor",
      servings: "Utilizator",
      ingredients,
      steps,
      summary: steps[0] || "Reteta adaugata de tine.",
      owner: "current-user"
    };

    if (editingId) {
      if (editingId.startsWith("default-recipe-")) {
        state.overrides[editingId] = recipe;
      } else {
        const index = state.custom.findIndex((item) => item.id === editingId);
        if (index >= 0) state.custom[index] = recipe;
      }
      const item = document.querySelector(`[data-recipe-id="${CSS.escape(editingId)}"]`);
      if (item) applyRecipeToCard(item, recipe);
      showToast("Reteta a fost actualizata.");
    } else {
      state.custom.push(recipe);
      const row = document.querySelector(".recipe-item")?.parentElement || document.querySelector(".main-content .row");
      if (row) {
        row.insertAdjacentHTML("beforeend", renderRecipeCard(recipe));
        ensureRecipeActions(row.querySelector(`[data-recipe-id="${CSS.escape(recipe.id)}"]`));
      }
      showToast("Reteta a fost salvata.");
    }

    saveRecipeState(state);
    bootstrap.Modal.getInstance(document.getElementById("addRecipeModal"))?.hide();
    resetRecipeFormMode();
    return true;
  }

  function pageKey() {
    const file = location.pathname.split("/").pop() || document.title || "page";
    return slugify(file.replace(".html", "")) || "page";
  }

  function parseCount(button) {
    const match = button?.textContent.match(/\d+/);
    return match ? Number(match[0]) : 0;
  }

  function getPostId(post, index) {
    if (!post.dataset.postId) {
      post.dataset.postId = `static-${pageKey()}-${index + 1}`;
    }
    return post.dataset.postId;
  }

  function isProfileOwnedPost(post) {
    return Boolean(post.closest(".profile-header ~ .main-content")) && post.closest(".card-custom")?.textContent.includes("Post");
  }

  function isOwnedPost(post) {
    const user = getUser();
    const author = post.querySelector(".post-info h4")?.textContent.trim();
    return post.dataset.owner === "current-user" ||
      isProfileOwnedPost(post) ||
      author === user.name ||
      author === DEFAULT_USER.name ||
      author === "Numele Tau";
  }

  function ensurePostActions(post) {
    const existing = post.querySelector(".post-header .dropdown");
    if (!isOwnedPost(post)) {
      if (existing) existing.style.display = "none";
      return;
    }

    post.dataset.owner = "current-user";
    if (existing) {
      existing.style.display = "";
      return;
    }

    const header = post.querySelector(".post-header");
    if (!header) return;
    header.insertAdjacentHTML("beforeend", `
      <div class="dropdown">
        <button class="btn btn-link text-dark p-0 text-decoration-none" type="button" data-bs-toggle="dropdown" aria-expanded="false" aria-label="Optiuni postare">
          <i class="fas fa-ellipsis-v"></i>
        </button>
        <ul class="dropdown-menu dropdown-menu-end">
          <li><a class="dropdown-item" href="#" onclick="editItem(this)"><i class="fas fa-edit me-2"></i>Modifica</a></li>
          <li><a class="dropdown-item" href="#" onclick="editItem(this)"><i class="fas fa-sync-alt me-2"></i>Actualizeaza</a></li>
          <li><hr class="dropdown-divider"></li>
          <li><a class="dropdown-item text-danger" href="#" onclick="deleteItem(this)"><i class="fas fa-trash me-2"></i>Sterge</a></li>
        </ul>
      </div>
    `);
  }

  function postActionsHtml(likes = 0, comments = 0) {
    return `
      <div class="mt-3 post-actions">
        <button class="btn btn-outline-success btn-sm me-2" data-action="like">
          <i class="far fa-heart me-1"></i> <span class="like-count">${likes}</span> Like-uri
        </button>
        <button class="btn btn-outline-primary btn-sm me-2" data-action="comments">
          <i class="far fa-comment me-1"></i> <span class="comment-count">${comments}</span> Comentarii
        </button>
        <button class="btn btn-outline-secondary btn-sm" data-action="share">
          <i class="fas fa-share me-1"></i> Distribuie
        </button>
      </div>
    `;
  }

  function renderPostCard(post) {
    const initials = toInitials(post.authorName);
    return `
      <div class="forum-post" data-dynamic-post="true" data-owner="current-user" data-post-id="${escapeHtml(post.id)}">
        <div class="post-header">
          <div class="post-avatar">${escapeHtml(initials)}</div>
          <div class="post-info">
            <h4>${escapeHtml(post.authorName)}</h4>
            <span>${escapeHtml(post.timeLabel || "Acum")} in ${escapeHtml(post.category || "Discutii Generale")}</span>
          </div>
        </div>
        <div class="post-content">
          <h5>${escapeHtml(post.title)}</h5>
          ${String(post.content || "").split(/\n+/).filter(Boolean).map((line) => `<p>${escapeHtml(line)}</p>`).join("")}
        </div>
        ${postActionsHtml(post.likes || 0, post.commentTotal || 0)}
      </div>
    `;
  }

  function applyPostOverride(post, data) {
    if (!data) return;

    const content = post.querySelector(".post-content");
    if (content) {
      content.innerHTML = `
        <h5>${escapeHtml(data.title || "Postarea mea")}</h5>
        ${String(data.content || "").split(/\n+/).filter(Boolean).map((line) => `<p>${escapeHtml(line)}</p>`).join("")}
      `;
    }

    const category = post.querySelector(".post-info span");
    if (category && data.category) {
      category.textContent = `${data.timeLabel || "Actualizat"} in ${data.category}`;
    }
  }

  function normalizePostButtons(post) {
    const actionArea = Array.from(post.children).find((child) =>
      child.classList.contains("mt-3") || child.classList.contains("mt-2") || child.classList.contains("post-actions")
    );
    if (!actionArea) return;

    actionArea.classList.add("post-actions");
    const buttons = actionArea.querySelectorAll("button");
    if (buttons[0]) buttons[0].dataset.action = "like";
    if (buttons[1]) buttons[1].dataset.action = "comments";
    if (buttons[2]) buttons[2].dataset.action = "share";
  }

  function updatePostCounters(post) {
    const id = post.dataset.postId;
    const state = getReactionState();
    const likeButton = post.querySelector('[data-action="like"]');
    const commentButton = post.querySelector('[data-action="comments"]');

    const likes = state.likes[id] ?? parseCount(likeButton);
    const comments = state.commentTotals[id] ?? parseCount(commentButton);

    if (likeButton) {
      likeButton.innerHTML = `<i class="far fa-heart me-1"></i> <span class="like-count">${likes}</span> Like-uri`;
      likeButton.classList.toggle("bg-success", Boolean(state.likedByMe[id]));
      likeButton.classList.toggle("text-white", Boolean(state.likedByMe[id]));
    }

    if (commentButton) {
      commentButton.innerHTML = `<i class="far fa-comment me-1"></i> <span class="comment-count">${comments}</span> Comentarii`;
    }
  }

  function hydratePosts() {
    const state = getPostState();
    document.querySelectorAll('[data-dynamic-post="true"]').forEach((post) => post.remove());

    Array.from(document.querySelectorAll(".forum-post")).forEach((post, index) => {
      const id = getPostId(post, index);
      if (state.deleted.includes(id)) {
        post.remove();
        return;
      }

      normalizePostButtons(post);
      applyPostOverride(post, state.overrides[id]);
      ensurePostActions(post);
      updatePostCounters(post);
    });

    const communityTitle = Array.from(document.querySelectorAll("h2.section-title")).find((title) =>
      slugify(title.textContent).includes("postari")
    );
    if (communityTitle && pageKey().includes("community")) {
      state.custom.slice().reverse().forEach((post) => {
        communityTitle.insertAdjacentHTML("afterend", renderPostCard(post));
      });
      Array.from(document.querySelectorAll('[data-dynamic-post="true"]')).forEach((post, index) => {
        getPostId(post, index);
        normalizePostButtons(post);
        ensurePostActions(post);
        updatePostCounters(post);
      });
    }
  }

  function hydrateOwnerMenus() {
    document.querySelectorAll(".recipe-item").forEach(ensureRecipeActions);
    document.querySelectorAll(".forum-post").forEach(ensurePostActions);
  }

  function openPostEditor(post) {
    const modalElement = document.getElementById("createPostModal");
    const form = modalElement?.querySelector("form");
    if (!modalElement || !form || !window.bootstrap) return;

    const title = post.querySelector(".post-content h5")?.textContent.trim() || "";
    const content = Array.from(post.querySelectorAll(".post-content p")).map((paragraph) => paragraph.textContent.trim()).join("\n");
    const categoryText = post.querySelector(".post-info span")?.textContent || "";
    const select = form.querySelector("select");

    form.dataset.editingId = post.dataset.postId;
    form.querySelector('input[type="text"]').value = title;
    form.querySelector("textarea").value = content;

    if (select) {
      const option = Array.from(select.options).find((item) => categoryText.includes(item.textContent.trim()));
      if (option) select.value = option.value;
    }

    const modalTitle = modalElement.querySelector(".modal-title");
    const submit = form.querySelector('button[type="submit"]');
    if (modalTitle) modalTitle.innerHTML = '<i class="fas fa-edit me-2"></i>Actualizeaza Postarea';
    if (submit) submit.textContent = "Actualizeaza";

    bootstrap.Modal.getOrCreateInstance(modalElement).show();
  }

  function resetPostFormMode() {
    const modalElement = document.getElementById("createPostModal");
    const form = modalElement?.querySelector("form");
    if (!form) return;

    delete form.dataset.editingId;
    form.reset();

    const modalTitle = modalElement.querySelector(".modal-title");
    const submit = form.querySelector('button[type="submit"]');
    if (modalTitle) modalTitle.innerHTML = '<i class="fas fa-plus-circle me-2"></i>Creeaza o Postare Noua';
    if (submit) submit.textContent = "Publica";
  }

  function handlePostSubmit(event) {
    const form = event.target;
    const modalElement = form.closest("#createPostModal");
    if (!modalElement) return false;

    event.preventDefault();
    event.stopImmediatePropagation();

    const user = getUser();
    const state = getPostState();
    const editingId = form.dataset.editingId;
    const data = {
      id: editingId || `post-${Date.now()}`,
      authorName: user.name,
      category: form.querySelector("select")?.value || "Discutii Generale",
      title: form.querySelector('input[type="text"]')?.value.trim() || "Postarea mea",
      content: form.querySelector("textarea")?.value.trim() || "",
      timeLabel: editingId ? "Actualizat" : "Acum",
      likes: 0,
      commentTotal: 0
    };

    if (editingId) {
      if (editingId.startsWith("static-")) {
        state.overrides[editingId] = data;
      } else {
        const index = state.custom.findIndex((post) => post.id === editingId);
        if (index >= 0) state.custom[index] = data;
      }
      const post = document.querySelector(`[data-post-id="${CSS.escape(editingId)}"]`);
      if (post) applyPostOverride(post, data);
      showToast("Postarea a fost actualizata.");
    } else {
      state.custom.push(data);
      const communityTitle = Array.from(document.querySelectorAll("h2.section-title")).find((title) =>
        slugify(title.textContent).includes("postari")
      );
      if (communityTitle) {
        communityTitle.insertAdjacentHTML("afterend", renderPostCard(data));
        const post = document.querySelector(`[data-post-id="${CSS.escape(data.id)}"]`);
        if (post) {
          normalizePostButtons(post);
          ensurePostActions(post);
          updatePostCounters(post);
        }
      }
      showToast("Postarea a fost publicata.");
    }

    savePostState(state);
    bootstrap.Modal.getInstance(modalElement)?.hide();
    resetPostFormMode();
    return true;
  }

  function toggleLike(post) {
    const id = post.dataset.postId;
    const state = getReactionState();
    const button = post.querySelector('[data-action="like"]');
    const current = state.likes[id] ?? parseCount(button);
    const liked = Boolean(state.likedByMe[id]);

    state.likes[id] = Math.max(0, liked ? current - 1 : current + 1);
    state.likedByMe[id] = !liked;
    saveReactionState(state);
    updatePostCounters(post);
  }

  function renderComments(post) {
    const id = post.dataset.postId;
    const state = getReactionState();
    const comments = state.comments[id] || [];
    const box = post.querySelector(".comment-box");
    if (!box) return;

    const listHtml = comments.length
      ? comments.map((comment) => `
          <div class="comment-item">
            <div class="comment-author">${escapeHtml(comment.author)}</div>
            <div class="comment-text">${escapeHtml(comment.text)}</div>
            <div class="comment-time">${escapeHtml(comment.time || "Acum")}</div>
          </div>
        `).join("")
      : '<p class="text-muted small mb-2">Nu sunt comentarii salvate local inca.</p>';

    box.innerHTML = `
      <div class="comment-list">${listHtml}</div>
      <form class="comment-form">
        <input class="form-control form-control-sm" type="text" placeholder="Scrie un comentariu..." required>
        <button class="btn btn-success btn-sm" type="submit">Trimite</button>
      </form>
    `;
  }

  function toggleComments(post) {
    let box = post.querySelector(".comment-box");
    if (!box) {
      post.insertAdjacentHTML("beforeend", '<div class="comment-box"></div>');
      box = post.querySelector(".comment-box");
      renderComments(post);
      return;
    }

    box.classList.toggle("d-none");
    if (!box.classList.contains("d-none")) renderComments(post);
  }

  function handleCommentSubmit(event) {
    const form = event.target;
    if (!form.classList.contains("comment-form")) return false;

    event.preventDefault();
    event.stopImmediatePropagation();

    const post = form.closest(".forum-post");
    const input = form.querySelector("input");
    const text = input?.value.trim();
    if (!post || !text) return true;

    const id = post.dataset.postId;
    const state = getReactionState();
    const button = post.querySelector('[data-action="comments"]');
    const total = state.commentTotals[id] ?? parseCount(button);

    state.comments[id] = state.comments[id] || [];
    state.comments[id].push({
      author: getUser().name,
      text,
      time: "Acum"
    });
    state.commentTotals[id] = total + 1;
    saveReactionState(state);

    input.value = "";
    renderComments(post);
    updatePostCounters(post);
    return true;
  }

  function handleDocumentClick(event) {
    const addRecipeTrigger = event.target.closest('[data-bs-target="#addRecipeModal"]');
    if (addRecipeTrigger) resetRecipeFormMode();

    const addPostTrigger = event.target.closest('[data-bs-target="#createPostModal"]');
    if (addPostTrigger) resetPostFormMode();

    const recipeViewButton = event.target.closest(".recipe-card .btn-success");
    if (recipeViewButton && !recipeViewButton.closest(".dropdown")) {
      const item = recipeViewButton.closest(".recipe-item");
      if (item) {
        event.preventDefault();
        event.stopImmediatePropagation();
        showRecipeDetails(item);
        return;
      }
    }

    const recipeFilterButton = event.target.closest(".text-center.mb-5 button");
    if (recipeFilterButton && document.querySelector(".recipe-item") && !recipeFilterButton.matches("[data-bs-toggle]")) {
      event.preventDefault();
      event.stopImmediatePropagation();

      document.querySelectorAll(".text-center.mb-5 button").forEach((button) => {
        if (button.matches("[data-bs-toggle]")) return;
        button.classList.remove("active", "btn-success");
        button.classList.add("btn-outline-success");
      });

      recipeFilterButton.classList.add("active", "btn-success");
      recipeFilterButton.classList.remove("btn-outline-success");

      const filter = slugify(recipeFilterButton.textContent);
      document.querySelectorAll(".recipe-item").forEach((item) => {
        item.style.display = filter.includes("toate") || item.dataset.category === filter ? "" : "none";
      });
      return;
    }

    const post = event.target.closest(".forum-post");
    const actionButton = event.target.closest("[data-action]");
    if (post && actionButton) {
      event.preventDefault();
      event.stopImmediatePropagation();

      if (actionButton.dataset.action === "like") {
        toggleLike(post);
      } else if (actionButton.dataset.action === "comments") {
        toggleComments(post);
      } else if (actionButton.dataset.action === "share") {
        showToast("Linkul postarii a fost copiat.");
      }
    }
  }

  function showToast(message) {
    const existing = document.querySelector(".toast-notification");
    if (existing) existing.remove();

    const toast = document.createElement("div");
    toast.className = "toast-notification";
    toast.innerHTML = `<i class="fas fa-check-circle"></i>${escapeHtml(message)}`;
    document.body.appendChild(toast);
    window.setTimeout(() => toast.remove(), 3400);
  }

  function deleteItem(trigger) {
    const event = window.event;
    if (event) event.preventDefault();

    const recipe = trigger.closest(".recipe-item");
    const post = trigger.closest(".forum-post");
    const target = recipe || post;
    if (!target) return false;

    const label = recipe ? "aceasta reteta" : "aceasta postare";
    if (!confirm(`Sigur vrei sa stergi ${label}?`)) return false;

    if (recipe) {
      const state = getRecipeState();
      const id = recipe.dataset.recipeId;
      if (id?.startsWith("default-recipe-")) {
        if (!state.deleted.includes(id)) state.deleted.push(id);
      } else {
        state.custom = state.custom.filter((item) => item.id !== id);
      }
      saveRecipeState(state);
      recipe.remove();
      showToast("Reteta a fost stearsa.");
    } else {
      const state = getPostState();
      const id = post.dataset.postId;
      if (id?.startsWith("static-")) {
        if (!state.deleted.includes(id)) state.deleted.push(id);
      } else {
        state.custom = state.custom.filter((item) => item.id !== id);
      }
      savePostState(state);
      post.remove();
      showToast("Postarea a fost stearsa.");
    }

    return false;
  }

  function editItem(trigger) {
    const event = window.event;
    if (event) event.preventDefault();

    const recipe = trigger.closest(".recipe-item");
    if (recipe) {
      openRecipeEditor(recipe);
      return false;
    }

    const post = trigger.closest(".forum-post");
    if (post) {
      openPostEditor(post);
      return false;
    }

    return false;
  }

  function init() {
    renderProfileUser(true);
    hydrateRecipes();
    hydratePosts();

    document.getElementById("addRecipeModal")?.addEventListener("hidden.bs.modal", resetRecipeFormMode);
    document.getElementById("createPostModal")?.addEventListener("hidden.bs.modal", resetPostFormMode);
  }

  document.addEventListener("submit", (event) => {
    if (handleProfileSubmit(event)) return;
    if (handleRecipeSubmit(event)) return;
    if (handlePostSubmit(event)) return;
    if (handleCommentSubmit(event)) return;
  }, true);

  document.addEventListener("click", handleDocumentClick, true);
  document.addEventListener("DOMContentLoaded", init);
  window.addEventListener("storage", (event) => {
    if ([USER_KEY, RECIPE_STATE_KEY, POST_STATE_KEY, REACTION_STATE_KEY].includes(event.key)) {
      renderProfileUser(false);
      hydrateRecipes();
      hydratePosts();
    }
  });

  window.updateNavbar = updateNavbar;
  window.deleteItem = deleteItem;
  window.editItem = editItem;
})();
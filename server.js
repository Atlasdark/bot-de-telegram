const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();

// 1. CONFIGURACIÓN SEGURA MEJORADA
const CONFIG = {
  TOKEN: process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN, // Compatibilidad con ambos nombres
  ADMIN_ID: process.env.ADMIN_CHAT_ID,
  POLLING_OPTIONS: {
    interval: 300,
    timeout: 15,
    autoStart: true,
    params: {
      allowed_updates: ["message", "callback_query", "pre_checkout_query"],
    },
  },
  PAYMENT_PROVIDER_TOKEN: process.env.PAYMENT_PROVIDER_TOKEN, // Para pagos con Telegram
};

// Validación de configuración
if (!CONFIG.TOKEN) {
  console.error("❌ ERROR: Token de Telegram no configurado en .env");
  process.exit(1);
}

const bot = new TelegramBot(CONFIG.TOKEN, {
  polling: CONFIG.POLLING_OPTIONS,
});

// 2. BASE DE DATOS MEJORADA DE SERVICIOS
const servicios = {
  musica: {
    nombre: "🎵 Servicios Musicales",
    icon: "🎵",
    items: [
      {
        id: "am3",
        nombre: "Apple Music",
        desc: "Suscripción por 3 meses",
        precio: 129,
      },
      {
        id: "am4",
        nombre: "Apple Music",
        desc: "Suscripción por 4 meses",
        precio: 175,
      },
      {
        id: "sp",
        nombre: "Spotify Premium",
        desc: "Suscripción por 1 mes",
        precio: 104,
      },
      {
        id: "dz",
        nombre: "Deezer Premium",
        desc: "Suscripción por 1 mes",
        precio: 118,
      },
      {
        id: "np",
        nombre: "Napster",
        desc: "Suscripción por 3 meses",
        precio: 125,
      },
      {
        id: "td",
        nombre: "Tidal Music",
        desc: "Suscripción HiFi por 1 mes",
        precio: 112,
      },
    ],
  },
  video: {
    nombre: "🎥 Plataformas de Video",
    icon: "🎥",
    items: [
      {
        id: "nf4",
        nombre: "Netflix Premium",
        desc: "4 pantallas UHD (1 mes)",
        precio: 108,
      },
      {
        id: "nf5",
        nombre: "Netflix Ultra",
        desc: "5 pantallas (1 mes)",
        precio: 233,
      },
      {
        id: "ds7",
        nombre: "Disney+ Premium",
        desc: "7 perfiles (1 mes)",
        precio: 213,
      },
      {
        id: "ds4",
        nombre: "Disney+ Standard",
        desc: "4 dispositivos (1 mes)",
        precio: 95,
      },
      { id: "hb5", nombre: "HBO Max", desc: "5 perfiles (1 mes)", precio: 125 },
      {
        id: "hb",
        nombre: "HBO Basic",
        desc: "Plan básico (1 mes)",
        precio: 79,
      },
      {
        id: "pm",
        nombre: "Paramount+",
        desc: "Plan básico (1 mes)",
        precio: 80,
      },
      {
        id: "pm5",
        nombre: "Paramount+ Premium",
        desc: "5 perfiles (1 mes)",
        precio: 110,
      },
      {
        id: "atv",
        nombre: "Apple TV+",
        desc: "Plan completo (1 mes)",
        precio: 119,
      },
      {
        id: "atvb",
        nombre: "Apple TV+",
        desc: "Plan básico (1 mes)",
        precio: 70,
      },
      { id: "vi", nombre: "Vix", desc: "Plan básico (1 mes)", precio: 78 },
      {
        id: "vip",
        nombre: "Vix Plus",
        desc: "5 perfiles (1 mes)",
        precio: 109,
      },
      {
        id: "ac",
        nombre: "ACORN TV",
        desc: "Suscripción por 1 mes",
        precio: 125,
      },
      {
        id: "ap",
        nombre: "ATRESPLAYER",
        desc: "Suscripción por 1 mes",
        precio: 124,
      },
      { id: "hl", nombre: "HULU", desc: "Suscripción por 1 mes", precio: 135 },
      {
        id: "pe",
        nombre: "PEACOCK",
        desc: "Suscripción por 1 mes",
        precio: 125,
      },
      {
        id: "rk",
        nombre: "RAKUTEN VIKI",
        desc: "1 dispositivo (1 mes)",
        precio: 150,
      },
      {
        id: "ph",
        nombre: "PORN-HUB Premium",
        desc: "5 perfiles (1 mes)",
        precio: 140,
      },
      {
        id: "yt",
        nombre: "YOUTUBE PREMIUM",
        desc: "1 dispositivo (1 mes)",
        precio: 115,
      },
    ],
  },
  herramientas: {
    nombre: "🛠 Herramientas Creativas",
    icon: "🛠️",
    items: [
      {
        id: "cv",
        nombre: "Canva Pro",
        desc: "Plan básico (1 mes)",
        precio: 99,
      },
      {
        id: "cvp",
        nombre: "Canva Premium",
        desc: "3 meses de suscripción",
        precio: 149,
      },
      {
        id: "cp1",
        nombre: "CapCut Pro",
        desc: "1 mes de suscripción",
        precio: 215,
      },
      {
        id: "cp3",
        nombre: "CapCut Pro",
        desc: "3 meses de suscripción",
        precio: 330,
      },
      {
        id: "cp6",
        nombre: "CapCut Pro",
        desc: "6 meses de suscripción",
        precio: 399,
      },
      {
        id: "cp12",
        nombre: "CapCut Pro",
        desc: "12 meses de suscripción",
        precio: 675,
      },
      {
        id: "fp",
        nombre: "FREEPIK Premium",
        desc: "1 mes de suscripción",
        precio: 128,
      },
      {
        id: "duo",
        nombre: "DUOLINGO Plus",
        desc: "1 mes de suscripción",
        precio: 135,
      },
      {
        id: "of",
        nombre: "OFFICE 365",
        desc: "Plan completo (1 mes)",
        precio: 279,
      },
    ],
  },
  otros: {
    nombre: "🎮 Otros Servicios",
    icon: "🎮",
    items: [
      {
        id: "gp",
        nombre: "GAME PASS ULTIMATE",
        desc: "1 mes de suscripción",
        precio: 260,
      },
      { id: "hg", nombre: "HOTGO", desc: "1 mes de suscripción", precio: 137 },
      {
        id: "it",
        nombre: "IPTV Premium",
        desc: "1 mes de suscripción",
        precio: 112,
      },
      { id: "mb", nombre: "MUBI", desc: "1 mes de suscripción", precio: 124 },
      { id: "ga", nombre: "GAIA", desc: "1 mes de suscripción", precio: 124 },
      {
        id: "pl",
        nombre: "PLEX TV",
        desc: "1 mes de suscripción",
        precio: 112,
      },
      {
        id: "se",
        nombre: "SCRIBD EVERAND",
        desc: "1 mes de suscripción",
        precio: 125,
      },
      {
        id: "shc",
        nombre: "Shahid Comprehensive",
        desc: "Plan completo (1 mes)",
        precio: 386,
      },
      {
        id: "shm",
        nombre: "Shahid Mobile VIP",
        desc: "Plan mobile (1 mes)",
        precio: 84,
      },
      {
        id: "shv",
        nombre: "Shahid VIP",
        desc: "Plan básico (1 mes)",
        precio: 109,
      },
      {
        id: "shb",
        nombre: "Shahid VIP BigTime",
        desc: "Plan BigTime (1 mes)",
        precio: 208,
      },
      {
        id: "shs",
        nombre: "Shahid VIP Sports",
        desc: "Plan Sports (1 mes)",
        precio: 323,
      },
      {
        id: "un",
        nombre: "UNIVERSAL PLUS",
        desc: "1 mes de suscripción",
        precio: 146,
      },
      {
        id: "ww",
        nombre: "WWE NETWORK",
        desc: "1 mes de suscripción",
        precio: 146,
      },
      {
        id: "fun",
        nombre: "Funimation",
        desc: "Plan básico (1 mes)",
        precio: 110,
      },
    ],
  },
};

// 3. SISTEMA DE CARRITO MEJORADO
const carritos = new Map();

const getCarrito = (chatId) => {
  if (!carritos.has(chatId)) {
    carritos.set(chatId, {
      items: [],
      total: 0,
      direccion: null,
      metodoPago: null,
    });
  }
  return carritos.get(chatId);
};

// 4. FUNCIONES AUXILIARES MEJORADAS
const findItemById = (itemId) => {
  for (const category of Object.values(servicios)) {
    const item = category.items.find((i) => i.id === itemId);
    if (item) return item;
  }
  return null;
};

const getItemCategory = (itemId) => {
  return Object.keys(servicios).find((cat) =>
    servicios[cat].items.some((item) => item.id === itemId)
  );
};

const formatCurrency = (amount) => {
  return `$${amount.toFixed(2)}`;
};

const buildMainMenu = () => {
  return {
    reply_markup: {
      keyboard: [
        ["📋 Catálogo de Servicios"],
        ["🛒 Ver Carrito", "📦 Mis Pedidos"],
        ["ℹ️ Ayuda", "📞 Contacto"],
      ],
      resize_keyboard: true,
      one_time_keyboard: false,
    },
    parse_mode: "Markdown",
  };
};

// 5. MANEJO DE COMANDOS MEJORADO
bot.onText(/\/start/, (msg) => {
  const welcomeMessage = `
🎬 *Bienvenido a StreamingBot*  

📌 *Servicios disponibles:*
- Plataformas de música premium
- Servicios de video streaming
- Suscripciones de juegos

💡 Usa los botones del menú para navegar o escribe /help para ayuda.
  `;

  bot.sendMessage(msg.chat.id, welcomeMessage, buildMainMenu());
});

bot.onText(/\/help/, (msg) => {
  const helpMessage = `
🆘 *Ayuda de StreamingBot*

📋 *Catálogo* - Ver todos los servicios disponibles
🛒 *Carrito* - Ver y gestionar tu carrito de compras
📦 *Mis Pedidos* - Ver tu historial de compras

💳 *Métodos de pago aceptados:*
- Tarjeta de crédito/débito
- PayPal
- Criptomonedas (BTC, ETH)

📞 *Soporte:* @soporte_streamingbot
  `;

  bot.sendMessage(msg.chat.id, helpMessage, buildMainMenu());
});

// 6. CATÁLOGO MEJORADO
bot.onText(/📋 Catálogo de Servicios/, (msg) => {
  const categorias = Object.entries(servicios).map(([key, cat]) => ({
    text: `${cat.icon} ${cat.nombre}`,
    callback_data: `cat_${key}`,
  }));

  // Dividir en filas de 2 botones cada una
  const keyboard = [];
  while (categorias.length > 0) {
    keyboard.push(categorias.splice(0, 2));
  }

  bot.sendMessage(msg.chat.id, "🔍 *Elige una categoría:*", {
    reply_markup: {
      inline_keyboard: keyboard,
    },
    parse_mode: "Markdown",
  });
});

// 7. MANEJO DE INTERACCIONES MEJORADO
bot.on("callback_query", async (query) => {
  const [action, data] = query.data.split("_");
  const chatId = query.message.chat.id;

  try {
    switch (action) {
      case "cat":
        await handleCategory(query, data);
        break;

      case "item":
        await handleItem(query, data);
        break;

      case "add":
        await addToCart(chatId, data);
        await bot.answerCallbackQuery(query.id, {
          text: "✅ Añadido al carrito",
          show_alert: false,
        });
        break;

      case "buy":
        await handlePurchase(chatId, data);
        break;

      case "back":
        await handleBackNavigation(query, data);
        break;

      case "cart":
        await handleCartAction(query, data);
        break;

      default:
        await bot.answerCallbackQuery(query.id, {
          text: "⚠️ Acción no reconocida",
          show_alert: false,
        });
    }
  } catch (error) {
    console.error("Error en callback:", error);
    await bot.answerCallbackQuery(query.id, {
      text: "⚠️ Error al procesar la solicitud",
      show_alert: true,
    });
  }
});

// 8. FUNCIONES DE MANEJO ESPECÍFICAS
async function handleCategory(query, categoryKey) {
  const chatId = query.message.chat.id;
  const categoria = servicios[categoryKey];

  if (!categoria) {
    await bot.answerCallbackQuery(query.id, {
      text: "⚠️ Categoría no encontrada",
      show_alert: true,
    });
    return;
  }

  const items = categoria.items.map((item) => [
    {
      text: `${item.nombre} - ${formatCurrency(item.precio)}`,
      callback_data: `item_${item.id}`,
    },
  ]);

  await bot.editMessageText(`📌 *${categoria.nombre}:*`, {
    chat_id: chatId,
    message_id: query.message.message_id,
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [
        ...items,
        [{ text: "🔙 Volver al menú", callback_data: "back_menu" }],
      ],
    },
  });
}

async function handleItem(query, itemId) {
  const chatId = query.message.chat.id;
  const item = findItemById(itemId);

  if (!item) {
    await bot.answerCallbackQuery(query.id, {
      text: "⚠️ Producto no encontrado",
      show_alert: true,
    });
    return;
  }

  const category = getItemCategory(itemId);

  await bot.editMessageText(
    `🛒 *${item.nombre}*\n` +
      `📝 ${item.desc}\n` +
      `💵 Precio: ${formatCurrency(item.precio)}\n` +
      `📦 Stock disponible: ${item.stock}\n\n` +
      `Selecciona una acción:`,
    {
      chat_id: chatId,
      message_id: query.message.message_id,
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [
            { text: "➕ Añadir al carrito", callback_data: `add_${item.id}` },
            { text: "💳 Comprar ahora", callback_data: `buy_${item.id}` },
          ],
          [{ text: "🔙 Volver a categoría", callback_data: `cat_${category}` }],
        ],
      },
    }
  );
}

async function addToCart(chatId, itemId) {
  const item = findItemById(itemId);
  if (!item) return false;

  const carrito = getCarrito(chatId);
  const existingItem = carrito.items.find((i) => i.id === itemId);

  if (existingItem) {
    existingItem.cantidad += 1;
  } else {
    carrito.items.push({
      id: item.id,
      nombre: item.nombre,
      precio: item.precio,
      cantidad: 1,
    });
  }

  carrito.total = carrito.items.reduce(
    (sum, item) => sum + item.precio * item.cantidad,
    0
  );
  return true;
}

async function handlePurchase(chatId, itemId) {
  const item = findItemById(itemId);
  if (!item) return false;

  // Aquí iría la lógica de pago
  // Por ahora solo mostramos un mensaje
  await bot.sendMessage(
    chatId,
    `🚀 *Compra rápida iniciada*\n\n` +
      `Producto: ${item.nombre}\n` +
      `Precio: ${formatCurrency(item.precio)}\n\n` +
      `Por favor, selecciona método de pago:`,
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "💳 Pagar con Tarjeta",
              callback_data: `pay_card_${itemId}`,
            },
            {
              text: "💰 Pagar con PayPal",
              callback_data: `pay_paypal_${itemId}`,
            },
          ],
          [{ text: "🔙 Cancelar", callback_data: "cancel_payment" }],
        ],
      },
      parse_mode: "Markdown",
    }
  );
}

// 9. MANEJO DEL CARRITO
bot.onText(/🛒 Ver Carrito/, async (msg) => {
  const chatId = msg.chat.id;
  const carrito = getCarrito(chatId);

  if (carrito.items.length === 0) {
    await bot.sendMessage(chatId, "🛒 Tu carrito está vacío", buildMainMenu());
    return;
  }

  const itemsText = carrito.items
    .map(
      (item) =>
        `- ${item.nombre} x${item.cantidad} = ${formatCurrency(
          item.precio * item.cantidad
        )}`
    )
    .join("\n");

  const message = `
🛒 *Tu Carrito de Compras*

${itemsText}

💵 *Total:* ${formatCurrency(carrito.total)}

¿Qué deseas hacer?
  `;

  await bot.sendMessage(chatId, message, {
    reply_markup: {
      inline_keyboard: [
        [
          { text: "💳 Pagar ahora", callback_data: "cart_checkout" },
          { text: "🗑 Vaciar carrito", callback_data: "cart_clear" },
        ],
        [{ text: "🛍 Seguir comprando", callback_data: "back_menu" }],
      ],
    },
    parse_mode: "Markdown",
  });
});

// 10. MANEJO DE ERRORES MEJORADO
bot.on("polling_error", (error) => {
  console.error(`⚠ Error de conexión: ${error.message}`);
  setTimeout(() => bot.startPolling(), 10000); // Reintentar después de 10 segundos
});

process.on("unhandledRejection", (error) => {
  console.error("🔥 Error no manejado:", error);
  // Aquí podrías notificar al admin
  if (CONFIG.ADMIN_ID) {
    bot
      .sendMessage(
        CONFIG.ADMIN_ID,
        `⚠ Error no manejado:\n${error.stack || error.message}`
      )
      .catch((err) => console.error("Error al notificar admin:", err));
  }
});

// Iniciar el bot
console.log("🤖 Bot iniciado correctamente");
console.log(
  "⚙️ Modo:",
  CONFIG.PAYMENT_PROVIDER_TOKEN ? "Con pagos" : "Sin pagos"
);

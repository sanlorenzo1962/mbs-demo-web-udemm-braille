const APP = {
    logData: [],
    nombreUsuario: "MARCELO",
    dots: [],
    buffer: null,
    bigChar: null,
    maskHex: null,
    idiomaActual: 'es-AR',
    sesionActiva: false,
    ws: null,
    palabraActual: "",
    modoVoz: true,
    t_inicio_sesion: 0,
    t_ultima_tecla: 0,
    timerInterval: null,
    wpmHistory: [],
    maxWpmSesion: 0,
    _wpmPico: 0,           // WPM máximo en ventana 30s
    _ventana30s: [],       // [{t, words}] para calcular WPM pico
    _wpmSostenido: 0,      // WPM excluyendo pausas >3s
    _pausasCount: 0,       // cantidad de pausas >3s en la sesión
    _segActivos: 0,        // segundos activos (sin pausas)
    _langTtsTimer: null,    // estabiliza el cambio de voz al cambiar de idioma

    // Textos estándar de la demo. Se centralizan para que el botón Ejemplo
    // y el cambio de idioma utilicen siempre el mismo texto por idioma.
    DEMO_EXAMPLES: {
        'es-AR': 'Bienvenido a MBS. Esta demostración muestra la representación dinámica de caracteres Braille sin necesidad de hardware conectado. ',
        'pt-BR': 'Bem-vindo ao MBS. Esta demonstração mostra a representação dinâmica de caracteres Braille sem necessidade de hardware conectado. ',
        'en-US': 'Welcome to MBS. This demonstration shows dynamic Braille character rendering without connected hardware. ',
        'fr-FR': 'Bienvenue dans MBS. Cette démonstration montre la représentation dynamique des caractères braille sans matériel connecté. '
    },

    esNumerico: false,
    esMayuscula: false,
	_bloqueoLecturaAuto: false,

    // ── Audio háptico ──────────────────────────────────────────────────
    audioCtx: null,
    tipoSonido: 'click',  // fijo en click

    TABLA_ES: {
        0x01:"a", 0x03:"b", 0x09:"c", 0x19:"d", 0x11:"e", 0x0b:"f", 0x1b:"g", 0x13:"h", 0x0a:"i", 0x1a:"j",
        0x05:"k", 0x07:"l", 0x0d:"m", 0x1d:"n", 0x15:"o", 0x0f:"p", 0x1f:"q", 0x17:"r", 0x0e:"s", 0x1e:"t",
        0x25:"u", 0x27:"v", 0x3a:"w", 0x2d:"x", 0x3d:"y", 0x35:"z",
        0x37:"á", 0x2e:"é", 0x0c:"í", 0x2c:"ó", 0x3e:"ú", 0x3b:"ñ", 0x33:"ü",
        0x23:"(", 0x1c:")", 0x12:":", 0x06:";", 0x02:",", 0x04:".", 0x24:"-", 0x18:"$", 0x22:"?",0x36: "COMILLA",0x16:"!", 0x26:'*', 0x30:"'", 0x30: "APOSTROFE"
    },

    TABLA_PT: {
        0x01:"a", 0x03:"b", 0x09:"c", 0x19:"d", 0x11:"e", 0x0b:"f", 0x1b:"g", 0x13:"h", 0x0a:"i", 0x1a:"j",
        0x05:"k", 0x07:"l", 0x0d:"m", 0x1d:"n", 0x15:"o", 0x0f:"p", 0x1f:"q", 0x17:"r", 0x0e:"s", 0x1e:"t",
        0x25:"u", 0x27:"v", 0x3a:"w", 0x2d:"x", 0x3d:"y", 0x35:"z",
        0x37:"á", 0x2e:"é", 0x0c:"í", 0x2c:"ó", 0x3e:"ú", 0x1c:"ã", 0x2a:"õ", 0x2f:"ç", 0x21:"â", 0x23:"ê", 0x39:"ô", 0x3b:"à",
        0x2b:"(", 0x31:")", 0x12:":", 0x06:";", 0x02:",", 0x04:".", 0x24:"-", 0x22:"?", 0x16:"!", 0x36: "COMILLA",0x26:'*', 0x30:"'",0x30: "APOSTROFE"
    },

    // Français — Code Braille Français Uniformisé (CBFU), braille de base.
    // Se incorporan letras y signos básicos para la DEMO. La notación numérica
    // francesa específica se deja fuera de esta primera etapa de validación.
    TABLA_FR: {
        0x01:"a", 0x03:"b", 0x09:"c", 0x19:"d", 0x11:"e", 0x0b:"f", 0x1b:"g", 0x13:"h", 0x0a:"i", 0x1a:"j",
        0x05:"k", 0x07:"l", 0x0d:"m", 0x1d:"n", 0x15:"o", 0x0f:"p", 0x1f:"q", 0x17:"r", 0x0e:"s", 0x1e:"t",
        0x25:"u", 0x27:"v", 0x3a:"w", 0x2d:"x", 0x3d:"y", 0x35:"z",
        0x2f:"ç", 0x3f:"é", 0x37:"à", 0x2e:"è", 0x3e:"ù",
        0x21:"â", 0x23:"ê", 0x29:"î", 0x39:"ô", 0x31:"û",
        0x2b:"ë", 0x3b:"ï", 0x33:"ü", 0x2a:"œ",
        0x02:",", 0x06:";", 0x12:":", 0x32:".", 0x22:"?", 0x16:"!",
        0x36:"COMILLA", 0x26:"(", 0x34:")", 0x04:"APOSTROFE", 0x0c:"/", 0x24:"-"
    },

    TABLA_NUM: {
        0x01:"1", 0x03:"2", 0x09:"3", 0x19:"4", 0x11:"5", 0x0b:"6", 0x1b:"7", 0x13:"8", 0x0a:"9", 0x1a:"0", 0x36:"=",
    },

    activarAccesibilidad: function() {
        const overlay = document.getElementById('overlay-inicio');
        if (overlay) overlay.style.display = 'none';
        const T = this.I18N[this.idiomaActual] || this.I18N['es-AR'];
        this._speakText(T.tts_listo, { cancel: true, force: true });

        // Avisar al ESP32 que hay un usuario activo en la app
        // (distinto a solo tener una conexion TCP abierta)
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send("APP_READY");
        } else if (this.ws) {
            // WS todavia no abrio (carga lenta): esperar una sola vez
            this.ws.addEventListener('open', () => this.ws.send("APP_READY"), { once: true });
        }
    },

    init: function() {
        this.dots = [null,
            document.getElementById('d1'), document.getElementById('d2'), document.getElementById('d3'),
            document.getElementById('d4'), document.getElementById('d5'), document.getElementById('d6')
        ];
        this.buffer  = document.getElementById('buffer');
        this.brailleBuffer = document.getElementById('brailleBuffer');
        this.bigChar = document.getElementById('bigChar');
        this.maskHex = document.getElementById('maskHex');
        // MBS 2026-08-07: cargar voces y restaurar el texto de prueba.
        this._initTTSVoices();
        this._ensureDemoControls();

// --- ACÁ PEGALO (Dentro de init) ---
        document.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('focus', () => {
                // Los botones de idioma se anuncian DESPUÉS de aplicar el nuevo idioma.
                // Si se leen al recibir foco, el evento focus ocurre antes del click y
                // puede pronunciar "Español/English/Français" con la voz anterior.
                if (['btnES', 'btnPT', 'btnEN', 'btnFR'].includes(btn.id)) return;

                // Prioridad: aria-label explícito > texto limpio del botón
                // Se eliminan emojis, símbolos y caracteres no pronunciables
                const textoRaw = btn.getAttribute('aria-label') || btn.innerText || '';
                const texto = textoRaw
                    .replace(/[\u{1F000}-\u{1FFFF}]/gu, '')   // emojis bloque alto
                    .replace(/[\u{2500}-\u{27BF}]/gu, '')     // simbolos miscelaneos + formas geometricas (▶ ◀ ★ etc)
                    .replace(/[\u{2B00}-\u{2BFF}]/gu, '')     // flechas y formas
                    .replace(/[\u{FE00}-\u{FEFF}]/gu, '')     // variantes y BOM
                    .replace(/[\u{1F300}-\u{1F9FF}]/gu, '')   // emojis miscelaneos
                    .replace(/[#*0-9]\uFE0F?\u20E3/gu, '')    // emojis de teclado numérico
                    .replace(/\s+/g, ' ')
                    .trim();
                if (texto && this.modoVoz) {
                    this._speakText(texto, { cancel: true });
                }
            });
        });
// hasta aca va el comando
        // Entrada de teclado para las lecciones de la demo pública.
        // Se instala ANTES de intentar la conexión WebSocket para que una falla
        // de red nunca deje inactivas las lecciones.
        window.addEventListener('keydown', (e) => {
            if (!this.lessonActive) return;
            if (e.ctrlKey || e.altKey || e.metaKey) return;
            // Durante una lección capturamos la tecla aunque el foco haya quedado
            // dentro del área de texto de la demo. Así la consigna siempre recibe
            // la respuesta y evitamos que la letra se escriba dos veces.
            if (e.key.length !== 1 || !/[a-záéíóúüñ]/i.test(e.key)) return;
            e.preventDefault();
            e.stopPropagation();
            this.handleLessonKey(e.key);
        }, true);
        this._applyLessonLanguage();

        this._wsRetrySeg = 1;
        try {
            this._wsConectar();
        } catch (err) {
            console.warn('[MBS Demo] WebSocket no disponible; continúa en modo demo.', err);
            this.demoMode = true;
            const st = document.getElementById('status');
            if (st) {
                st.style.color = 'var(--accent-yellow)';
                st.innerHTML = '<span class="status-dot" style="background:var(--accent-yellow);animation:none"></span> MODO DEMO';
            }
        }
	},

    // ── WebSocket con reconexión automática (backoff exponencial) ─────────
    _wsConectar: function() {
        // Modo demo: permite usar la WebApp sin ESP32-S3 ni WebSocket.
        // Se activa automáticamente si se abre como archivo local o agregando ?demo=1 a la URL.
        const params = new URLSearchParams(window.location.search);
        const host = window.location.hostname.toLowerCase();
        this.demoMode = (
            window.location.protocol === 'file:' ||
            params.get('demo') === '1' ||
            host.endsWith('github.io')
        );
        if (this.demoMode) {
            const st = document.getElementById('status');
            if (st) {
                st.style.color = 'var(--accent-yellow)';
                st.innerHTML = '<span class="status-dot" style="background:var(--accent-yellow);animation:none"></span> MODO DEMO';
            }
            return;
        }

        this.ws = new WebSocket(`ws://${window.location.host}/ws`);

        this.ws.onopen = () => {
            clearTimeout(this._wsRetryTimer);
            this._wsRetrySeg = 1;
            const st  = document.getElementById('status');
            if (st) st.innerHTML = '<span class="status-dot"></span> CONECTADO';
            // Restaurar color verde del status
            if (st) { st.style.color = ''; }
            const dot = st ? st.querySelector('.status-dot') : null;
            if (dot) dot.style.cssText = '';
        },

        this.ws.onclose = () => {
            this._wsMostrarDesconectado();
            this._wsRetryTimer = setTimeout(() => {
                this._wsRetrySeg = Math.min((this._wsRetrySeg || 1) * 2, 30);
                this._wsConectar();
            }, (this._wsRetrySeg || 1) * 1000);
        },

        this.ws.onerror = () => { this.ws.close(); },

        this.ws.onmessage = (e) => {
            if (e.data === "PONG_OK") return;
            const data = JSON.parse(e.data);

            // --- 1. BLOQUE DE COMILLAS (CON MÉTRICAS) ---
            if (data.val === "COMILLA") {
                if (this.palabraActual.length > 0) {
                    this._speakText(this.palabraActual, { cancel: false });
                    this.palabraActual = ""; 
                }
                this.buffer.value += '"';
                this.updateDots(data.m);
                
                // Registro para el CSV
                if (this.sesionActiva) {
                    this.logData.push({
                        hora: new Date().toLocaleTimeString(),
                        ms_dif: this.t_ultima_tecla ? Math.round(performance.now() - this.t_ultima_tecla) : 0,
                        mask: "0x" + data.m.toString(16).toUpperCase(),
                        char: '"',
                        wpm_acum: document.getElementById('wpmValue').textContent,
                        pausa: (performance.now() - this.t_ultima_tecla > 3000) ? "SI" : "NO",
                        seg_sesion: Math.floor((performance.now() - this.t_inicio_sesion) / 1000)
                    });
                }

                setTimeout(() => {
                    const T = this.I18N[this.idiomaActual] || this.I18N['es-AR'];
                    this._speakText(T.tts_comilla || 'Comilla', { cancel: false });
                }, 300);
                return; 
            }

            // --- 2. BLOQUE DE APÓSTROFE (CON MÉTRICAS) ---
            if (data.val === "APOSTROFE") {
                if (this.palabraActual.length > 0) {
                    this._speakText(this.palabraActual, { cancel: false });
                    this.palabraActual = ""; 
                }
                this.buffer.value += "'";
                this.updateDots(data.m);
                
                if (this.sesionActiva) {
                    this.logData.push({
                        hora: new Date().toLocaleTimeString(),
                        ms_dif: this.t_ultima_tecla ? Math.round(performance.now() - this.t_ultima_tecla) : 0,
                        mask: "0x" + data.m.toString(16).toUpperCase(),
                        char: "'",
                        wpm_acum: document.getElementById('wpmValue').textContent,
                        pausa: (performance.now() - this.t_ultima_tecla > 3000) ? "SI" : "NO",
                        seg_sesion: Math.floor((performance.now() - this.t_inicio_sesion) / 1000)
                    });
                }

                setTimeout(() => {
                    const T = this.I18N[this.idiomaActual] || this.I18N['es-AR'];
                    this._speakText(T.tts_apostrofe || 'Apóstrofe', { cancel: false });
                }, 300);
                return; 
            }

            const m = parseInt(data.m);
            this.updateDots(m);

            if (this.maskHex) {
                this.maskHex.textContent = "0x" + m.toString(16).toUpperCase().padStart(2, '0');
            }

            setTimeout(() => {
                let finalChar = "";
                let esComando = false;
                const ahora = performance.now();
                const msDif = this.t_ultima_tecla ? Math.round(ahora - this.t_ultima_tecla) : 0;

                if (m === 0x3c) {
                    this.esNumerico = true;
                    esComando = true;
                    this._setBadge('stateNum', true);
                } else if (m === 0x28) { // SIGNO MAYÚSCULA (4-6)
                    if (this.esMayuscula === "SIMPLE") this.esMayuscula = "LOCK";
                    else if (this.esMayuscula === "LOCK") this.esMayuscula = false;
                    else this.esMayuscula = "SIMPLE";
                    this._setBadge('stateMay', !!this.esMayuscula);
                    esComando = true;
                }

                if (!esComando) {
                    if (m === 0 || data.val === " " || data.val === "ENTER") {
                        finalChar = (data.val === "ENTER") ? "\n" : " ";
                        this.esNumerico = false;
                        this.esMayuscula = false; 
                        this._setBadge('stateNum', false);
                        this._setBadge('stateMay', false);
                    } else {
                        // Tus accesos directos
                        if (m === 0x2b) finalChar = "(";
                        else if (m === 0x31) finalChar = ")";
                        else if (m === 0x1e) finalChar = "t";
                        else if (m === 0x2e) finalChar = "é";
                        else if (m === 0x0f) finalChar = this.esNumerico ? "%" : "p";
                        else if (m === 0x0c) finalChar = this.esNumerico ? "/" : "í";
                        else if (m === 0x3e) finalChar = this.esNumerico ? "=" : "ú";
                        else if (m === 0x04) finalChar = ".";
                        else if (m === 0x02) finalChar = ",";
                        else if (m === 0x06) finalChar = ";";
                        else if (m === 0x12) finalChar = ":";
                        else if (m === 0x22) finalChar = "?";
                        else if (m === 0x16) finalChar = this.esNumerico ? "+" : "!";
                        else if (m === 0x24) finalChar = "-";

                        if (finalChar === "") {
                            const tabla = this.idiomaActual === 'es-AR' ? this.TABLA_ES : (this.idiomaActual === 'fr-FR' ? this.TABLA_FR : this.TABLA_PT);
                            finalChar = this.esNumerico ? (this.TABLA_NUM[m] || tabla[m]) : tabla[m];
                        }
                    }
                }

                if (!esComando && finalChar) {
                    let charFinal = finalChar;
                    if (this.esMayuscula && /[a-zà-ÿñçœ]/.test(charFinal)) {
                        charFinal = charFinal.toUpperCase();
                        if (this.esMayuscula === "SIMPLE") {
                            this.esMayuscula = false;
                            this._setBadge('stateMay', false);
                        }
                    }

                    // --- REINSTALACIÓN DE MÉTRICAS ---
                    if (this.sesionActiva) {
                        this.logData.push({
                            hora: new Date().toLocaleTimeString(),
                            ms_dif: msDif,
                            mask: "0x" + m.toString(16).toUpperCase(),
                            char: charFinal === " " ? "[ESPACIO]" : (charFinal === "\n" ? "[ENTER]" : charFinal),
                            wpm_acum: document.getElementById('wpmValue').textContent,
                            pausa: (msDif > 3000) ? "SI" : "NO",
                            seg_sesion: Math.floor((ahora - this.t_inicio_sesion) / 1000)
                        });
                        this._actualizarMetricas(msDif);
                    }
					
                    this.t_ultima_tecla = ahora;
                    this._beep('ok');
                    this.buffer.value += charFinal;
					if (this.bigChar) {
					this.bigChar.textContent = charFinal === " " ? "␣" : charFinal; 
					}

                    if (charFinal === " " || charFinal === "\n") {
                        if (this.modoVoz && this.palabraActual) {
                            this._speakText(this.palabraActual, { cancel: false });
                        }
                        this.palabraActual = "";
                    } else {
                        this.palabraActual += charFinal;
                    }
                }
                this.buffer.scrollTop = this.buffer.scrollHeight;
            }, 10);
        };  // fin onmessage
    },  // fin _wsConectar

    _wsMostrarDesconectado: function() {
        const st  = document.getElementById('status');
        const seg = this._wsRetrySeg || 1;
        const prox = Math.min(seg * 2, 30);
        if (st) {
            st.style.color = 'var(--accent-red)';
            st.innerHTML = `<span class="status-dot" style="background:var(--accent-red);animation:none"></span> RECONECTANDO en ${prox}s`;
        }
    },

    // ===== MÉTRICAS =====
    _metIntervals: [],   // todos los intervalos de la sesión (ms)
    _tPrimeraTecla: 0,

    // Calcula percentil p (0-100) sobre array ordenado
    _percentil: function(arr, p) {
        if (!arr.length) return null;
        const sorted = [...arr].sort((a,b) => a-b);
        const idx = Math.ceil((p / 100) * sorted.length) - 1;
        return Math.round(sorted[Math.max(0, idx)]);
    },

    // Calcula desviación estándar
    _sigma: function(arr) {
        if (arr.length < 2) return null;
        const avg = arr.reduce((a,b) => a+b, 0) / arr.length;
        const variance = arr.reduce((s,v) => s + (v-avg)**2, 0) / arr.length;
        return Math.round(Math.sqrt(variance));
    },

    // ── Audio háptico (Web Audio API) ────────────────────────────────
    _initAudio: function() {
        if (!this.audioCtx) {
            this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
    },

    // tipo: 'ok' (carácter válido) | 'error' (inválido) | 'cmd' (comando)
    _beep: function(tipo) {
        if (this.tipoSonido === 'off') return;
        this._initAudio();
        const ctx = this.audioCtx;

        const configs = {
            // plop — membrana suave
            plop: {
                ok:    { freq:180, type:'sine',     dur:0.08, gain:0.4,  decay:0.07 },
                error: { freq:120, type:'sine',     dur:0.18, gain:0.5,  decay:0.15, pulsos:2 },
                cmd:   { freq:260, type:'sine',     dur:0.06, gain:0.3,  decay:0.05 }
            },
            // beep — electrónico
            beep: {
                ok:    { freq:880, type:'square',   dur:0.06, gain:0.15, decay:0.05 },
                error: { freq:220, type:'square',   dur:0.12, gain:0.2,  decay:0.10, pulsos:2 },
                cmd:   { freq:1100,type:'square',   dur:0.05, gain:0.12, decay:0.04 }
            },
            // click — seco percusivo
            click: {
                ok:    { freq:800, type:'triangle', dur:0.04, gain:0.35, decay:0.03 },
                error: { freq:300, type:'triangle', dur:0.10, gain:0.45, decay:0.08, pulsos:2 },
                cmd:   { freq:1000,type:'triangle', dur:0.03, gain:0.25, decay:0.02 }
            }
        };

        const cfg = (configs[this.tipoSonido] || configs.plop)[tipo] || configs.plop.ok;
        const pulsos = cfg.pulsos || 1;

        const emitir = (delay) => {
            const osc  = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = cfg.type;
            osc.frequency.setValueAtTime(cfg.freq, ctx.currentTime + delay);
            gain.gain.setValueAtTime(cfg.gain, ctx.currentTime + delay);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + cfg.decay);
            osc.start(ctx.currentTime + delay);
            osc.stop(ctx.currentTime + delay + cfg.dur);
        };

        for (let i = 0; i < pulsos; i++) {
            emitir(i * (cfg.dur + 0.07));
        }
    },

    _actualizarMetricas: function(intervaloMs) {
        const ahora = performance.now();
        const texto = this.buffer ? this.buffer.value : "";
        const chars = texto.replace(/\s/g, '').length;
        const words = texto.trim().split(/\s+/).filter(w => w.length > 0).length;

        if (!this._tPrimeraTecla) this._tPrimeraTecla = ahora;

        // ── Detección de pausa ────────────────────────────────────────
        const esPausa = intervaloMs && intervaloMs > 3000;
        if (esPausa && this.sesionActiva) this._pausasCount++;

        // ── Acumular intervalo (solo si NO es pausa, para estadísticas limpias)
        if (intervaloMs && intervaloMs > 0 && !esPausa) {
            this._metIntervals.push(intervaloMs);
            // Acumular tiempo activo
            this._segActivos += intervaloMs / 1000;
        }

        // ── WPM general ───────────────────────────────────────────────
        const tRef = (this.sesionActiva && this.t_inicio_sesion) ? this.t_inicio_sesion : this._tPrimeraTecla;
        const minutos = tRef ? (ahora - tRef) / 60000 : 0;
        const wpm = minutos > 0.05 ? Math.round(words / minutos) : 0;
        if (wpm > this.maxWpmSesion) this.maxWpmSesion = wpm;

        // ── WPM sostenido (palabras / tiempo activo, excluye pausas) ──
        const minActivos = this._segActivos / 60;
        this._wpmSostenido = minActivos > 0.05 ? Math.round(words / minActivos) : 0;

        // ── WPM pico: ventana deslizante de 30s ───────────────────────
        if (this.sesionActiva) {
            // Agregar snapshot actual
            this._ventana30s.push({ t: ahora, words });
            // Descartar entradas fuera de la ventana de 30s
            const corte = ahora - 30000;
            while (this._ventana30s.length > 1 && this._ventana30s[0].t < corte) {
                this._ventana30s.shift();
            }
            // WPM pico = delta palabras en la ventana / 0.5 min
            if (this._ventana30s.length >= 2) {
                const primero = this._ventana30s[0];
                const deltaW = words - primero.words;
                const deltaMin = (ahora - primero.t) / 60000;
                const wpmVentana = deltaMin > 0 ? Math.round(deltaW / deltaMin) : 0;
                if (wpmVentana > this._wpmPico) this._wpmPico = wpmVentana;
            }
        }

        // ── Estadísticas de intervalos ────────────────────────────────
        const avgMs = this._metIntervals.length > 0
            ? Math.round(this._metIntervals.reduce((a,b) => a+b, 0) / this._metIntervals.length)
            : null;

        // ── Actualizar UI ─────────────────────────────────────────────
        const el = (id) => document.getElementById(id);
        if (el('wpmValue'))    el('wpmValue').textContent    = wpm;
        if (el('totalChars'))  el('totalChars').textContent  = chars;
        if (el('totalWords'))  el('totalWords').textContent  = words;
        if (el('avgInterval')) el('avgInterval').textContent = avgMs !== null ? avgMs : "—";

        const pct = Math.min((wpm / 60) * 100, 100);
        const bar = el('wpmBar');
        if (bar) bar.style.width = pct + "%";
    },

    _setBadge: function(id, on) {
        const el = document.getElementById(id);
        if (el) el.classList.toggle('on', on);
    },

    // ===== TIMER DE SESIÓN =====
    _iniciarTimer: function() {
        const info = document.getElementById('sessionInfo');
        const timerEl = document.getElementById('sessionTimer');
        const nameEl  = document.getElementById('sessionName');
        if (nameEl) nameEl.textContent = this.nombreUsuario;
        if (info)   info.style.display = 'flex';

        this.timerInterval = setInterval(() => {
            const seg = Math.floor((performance.now() - this.t_inicio_sesion) / 1000);
            const mm = String(Math.floor(seg / 60)).padStart(2, '0');
            const ss = String(seg % 60).padStart(2, '0');
            if (timerEl) timerEl.textContent = `${mm}:${ss}`;
        }, 1000);
    },

    _detenerTimer: function() {
        clearInterval(this.timerInterval);
        const info = document.getElementById('sessionInfo');
        if (info) info.style.display = 'none';
    },

    // ===== SESIÓN =====
    toggleSesion: function() {
        const btn = document.getElementById('btnSesion');

        if (!this.sesionActiva) {
            // Mini-modal no bloqueante en lugar de prompt()
            this._pedirNombreYArrancar();
            return;  // La sesión arranca desde el callback del modal
        } else {
            this.sesionActiva = false;
            this._tts('tts_detener');
            if (btn) {
                btn.innerHTML = '<span class="btn-icon">▶</span> Iniciar Sesión';
                btn.classList.remove('detener');
            }
            this._detenerTimer();
            this._mostrarResumen();
        }
    },

    // ===== MODAL RESUMEN =====
    _mostrarResumen: function() {
        const texto   = this.buffer ? this.buffer.value : "";
        const chars   = this.logData.filter(r => r.char !== "[ESPACIO]" && r.char !== "[ENTER]").length;
        const words   = texto.trim().split(/\s+/).filter(w => w.length > 0).length;
        const seg     = Math.round((performance.now() - this.t_inicio_sesion) / 1000);
        const minutos = seg / 60;
        const wpmProm = minutos > 0 ? Math.round(words / minutos) : 0;

        const avgMs  = this._metIntervals.length > 0
            ? Math.round(this._metIntervals.reduce((a,b) => a+b, 0) / this._metIntervals.length)
            : null;
        const sigma  = this._sigma(this._metIntervals);
        const p50    = this._percentil(this._metIntervals, 50);
        const p90    = this._percentil(this._metIntervals, 90);

        const mm = String(Math.floor(seg / 60)).padStart(2,'0');
        const ss = String(seg % 60).padStart(2,'0');

        const fmt = (v, suf='') => v !== null && v !== undefined ? v + suf : '—';
        const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };

        set('modalNombre',   this.nombreUsuario.toUpperCase());
        set('resWpm',        wpmProm);
        set('resChars',      chars);
        set('resWords',      words);
        set('resDuracion',   `${mm}:${ss}`);
        set('resAvgMs',      fmt(avgMs, ' ms'));
        set('resMaxWpm',     this.maxWpmSesion);
        set('resWpmSost',    Math.round(this._wpmSostenido));
        set('resWpmPico',    Math.round(this._wpmPico));
        set('resSigma',      fmt(sigma, ' ms'));
        set('resP50',        fmt(p50,   ' ms'));
        set('resP90',        fmt(p90,   ' ms'));
        set('resPausas',     this._pausasCount);

        // Guardar snapshot para TTS
        this._resumenSnapshot = {
            wpmProm, wpmSost: Math.round(this._wpmSostenido),
            wpmPico: Math.round(this._wpmPico), maxWpm: this.maxWpmSesion,
            chars, words, duracion: `${mm}:${ss}`,
            avgMs, sigma, p50, p90, pausas: this._pausasCount
        };

        const modal = document.getElementById('modalResumen');
        if (modal) modal.style.display = 'flex';

        // Resetear barra de progreso TTS y botón
        const bar = document.getElementById('ttsProgressBar');
        if (bar) bar.style.width = '0%';
        const btnTTS = document.getElementById('btnTTSResumen');
        const T = this.I18N[this.idiomaActual] || this.I18N['es-AR'];
        if (btnTTS) btnTTS.textContent = T.tts_btn_reproducir || '▶ Reproducir';

        // Disparar TTS automáticamente tras 600ms para que el modal esté visible
        setTimeout(() => this._playTTSResumen(), 600);
    },

    // Construye el guión del resumen hablado con los valores reales
    _buildTTSResumen: function(s) {
        const T = this.I18N[this.idiomaActual] || this.I18N['es-AR'];
        const fmt = (v) => (v !== null && v !== undefined) ? v : 'sin datos';
        if (this.idiomaActual === 'en-US') {
            return `Session summary for ${this.nombreUsuario}. ` +
                `Duration: ${s.duracion}. ` +
                `You typed ${s.chars} characters and ${s.words} words. ` +
                `Average speed: ${s.wpmProm} words per minute. ` +
                `Sustained speed: ${s.wpmSost} words per minute. ` +
                `Peak speed: ${s.wpmPico} words per minute. ` +
                `Average time per key: ${fmt(s.avgMs)} milliseconds. ` +
                `Regularity sigma: ${fmt(s.sigma)} milliseconds. ` +
                `Pauses longer than three seconds: ${s.pausas}. ` +
                `Well done! Keep practicing.`;
        }
        if (this.idiomaActual === 'fr-FR') {
            return `Résumé de la session de ${this.nombreUsuario}. ` +
                `Durée : ${s.duracion}. ` +
                `Vous avez saisi ${s.chars} caractères et ${s.words} mots. ` +
                `Vitesse moyenne : ${s.wpmProm} mots par minute. ` +
                `Vitesse soutenue : ${s.wpmSost} mots par minute. ` +
                `Vitesse maximale : ${s.wpmPico} mots par minute. ` +
                `Temps moyen par touche : ${fmt(s.avgMs)} millisecondes. ` +
                `Sigma de régularité : ${fmt(s.sigma)} millisecondes. ` +
                `Pauses de plus de trois secondes : ${s.pausas}. ` +
                `Très bien ! Continuez à vous entraîner.`;
        }
        if (this.idiomaActual === 'pt-BR') {
            return `Resumo da sessão de ${this.nombreUsuario}. ` +
                `Duração: ${s.duracion}. ` +
                `Você digitou ${s.chars} caracteres e ${s.words} palavras. ` +
                `Velocidade média: ${s.wpmProm} palavras por minuto. ` +
                `Velocidade sustentada: ${s.wpmSost} palavras por minuto. ` +
                `Pico de velocidade: ${s.wpmPico} palavras por minuto. ` +
                `Tempo médio por tecla: ${fmt(s.avgMs)} milissegundos. ` +
                `Sigma de regularidade: ${fmt(s.sigma)} milissegundos. ` +
                `Pausas maiores que três segundos: ${s.pausas}. ` +
                `Parabéns! Continue praticando.`;
        }
        return `Resumen de sesión de ${this.nombreUsuario}. ` +
            `Duración: ${s.duracion}. ` +
            `Escribiste ${s.chars} caracteres y ${s.words} palabras. ` +
            `Velocidad promedio: ${s.wpmProm} palabras por minuto. ` +
            `Velocidad sostenida: ${s.wpmSost} palabras por minuto. ` +
            `Velocidad pico: ${s.wpmPico} palabras por minuto. ` +
            `Tiempo promedio por tecla: ${fmt(s.avgMs)} milisegundos. ` +
            `Sigma de regularidad: ${fmt(s.sigma)} milisegundos. ` +
            `Pausas mayores a tres segundos: ${s.pausas}. ` +
            `¡Muy bien! Seguí practicando.`;
    },

    // Reproduce el TTS del resumen con barra de progreso animada
    _playTTSResumen: function() {
        if (!this._resumenSnapshot) return;
        const texto = this._buildTTSResumen(this._resumenSnapshot);
        const T = this.I18N[this.idiomaActual] || this.I18N['es-AR'];
        const btnTTS = document.getElementById('btnTTSResumen');
        const bar    = document.getElementById('ttsProgressBar');

        window.speechSynthesis.cancel();

        if (btnTTS) {
            btnTTS.textContent = T.tts_btn_reproduciendo || '⏸ Reproduciendo...';
            btnTTS.disabled = true;
        }
        if (bar) bar.style.width = '0%';

        // Animación de progreso: avanza suavemente hasta 90% durante la locución
        let progreso = 0;
        this._ttsProgressTimer = setInterval(() => {
            progreso = Math.min(progreso + 0.8, 90);
            if (bar) bar.style.width = progreso + '%';
        }, 200);
        this._speakText(texto, {
            cancel: true,
            rate: 0.95,
            onend: () => {
                clearInterval(this._ttsProgressTimer);
                if (bar) bar.style.width = '100%';
                if (btnTTS) {
                    btnTTS.textContent = T.tts_btn_repetir || '↺ Repetir';
                    btnTTS.disabled = false;
                }
            },
            onerror: () => {
                clearInterval(this._ttsProgressTimer);
                if (btnTTS) {
                    btnTTS.textContent = T.tts_btn_reproducir || '▶ Reproducir';
                    btnTTS.disabled = false;
                }
            }
        });
    },

    cerrarResumen: function() {
        window.speechSynthesis.cancel();
        clearInterval(this._ttsProgressTimer);
        const modal = document.getElementById('modalResumen');
        if (modal) modal.style.display = 'none';
    },

    // ===== RESTO (sin cambios funcionales) =====
    updateDots: function(mask) {
        for (let i = 1; i <= 6; i++) {
            const bit = 1 << (i - 1);
            if (this.dots[i]) this.dots[i].classList.toggle('active', !!(mask & bit));
        }
    },

    updateSpeed: function(val) {
        const el = document.getElementById('speedValue');
        if (el) el.innerText = val;
        if (this.ws && this.ws.readyState === WebSocket.OPEN) this.ws.send("SPD_" + val);
        // Anunciar velocidad (con debounce para no spamear mientras se arrastra)
        clearTimeout(this._speedTtsTimer);
        this._speedTtsTimer = setTimeout(() => {
            if (!this.modoVoz) return;
            const T = this.I18N[this.idiomaActual] || this.I18N['es-AR'];
            this._speakText(`${T.tts_velocidad} ${val}`, { cancel: true });
        }, 600);
    },

    // ===== TTS MULTILINGÜE CENTRALIZADO (2026-08-07) =====
    _voices: [],
    _voicesReady: false,
    _voiceListenerInstalled: false,

    _initTTSVoices: function() {
        if (!('speechSynthesis' in window)) return;
        const cargar = () => {
            this._voices = window.speechSynthesis.getVoices() || [];
            this._voicesReady = this._voices.length > 0;
            this._updateVoiceStatus();
        };
        cargar();
        if (!this._voiceListenerInstalled) {
            window.speechSynthesis.addEventListener('voiceschanged', cargar);
            this._voiceListenerInstalled = true;
        }
    },

    _selectVoice: function(lang) {
        const voices = (this._voices && this._voices.length)
            ? this._voices
            : (window.speechSynthesis.getVoices() || []);
        if (!voices.length) return null;

        const target = (lang || this.idiomaActual || 'es-AR').toLowerCase();
        const base = target.split('-')[0];
        const norm = v => (v.lang || '').toLowerCase().replace('_', '-');
        const name = v => (v.name || '').toLowerCase();
        let v = voices.find(x => norm(x) === target);
        if (v) return v;

        if (target === 'pt-br') {
            v = voices.find(x => norm(x).startsWith('pt-br'));
            if (v) return v;
            v = voices.find(x => norm(x).startsWith('pt') && /brasil|brazil/.test(name(x)));
            if (v) return v;
            // Para la demo educativa preferimos silencio antes que usar pt-PT o es-*.
            return null;
        }
        if (target === 'es-ar') {
            return voices.find(x => norm(x).startsWith('es-ar')) ||
                   voices.find(x => norm(x).startsWith('es')) || null;
        }
        if (target === 'en-us') {
            return voices.find(x => norm(x).startsWith('en-us')) ||
                   voices.find(x => norm(x).startsWith('en')) || null;
        }
        if (target === 'fr-fr') {
            return voices.find(x => norm(x).startsWith('fr-fr')) ||
                   voices.find(x => norm(x).startsWith('fr')) || null;
        }
        return voices.find(x => norm(x).startsWith(base)) || null;
    },

    _voiceStatusText: function() {
        const lang = this.idiomaActual || 'es-AR';
        const voice = this._selectVoice(lang);
        if (voice) return `${voice.name} (${voice.lang})`;
        if (!this._voicesReady) {
            return lang === 'pt-BR' ? 'Carregando voz...' :
                   lang === 'en-US' ? 'Loading voice...' :
                   lang === 'fr-FR' ? 'Chargement de la voix...' : 'Cargando voz...';
        }
        return lang === 'pt-BR' ? 'Sem voz em português brasileiro disponível neste dispositivo' :
               lang === 'en-US' ? 'No English voice available on this device' :
               lang === 'fr-FR' ? 'Aucune voix française disponible sur cet appareil' :
               'No hay una voz en español disponible en este equipo';
    },

    _updateVoiceStatus: function() {
        const el = document.getElementById('demoVoiceStatus');
        if (!el) return;
        const prefix = this.idiomaActual === 'en-US' ? 'Voice' : (this.idiomaActual === 'fr-FR' ? 'Voix' : 'Voz');
        el.textContent = `${prefix}: ${this._voiceStatusText()}`;
    },

    _speakText: function(text, opts = {}) {
        if (!text || !('speechSynthesis' in window)) return null;
        if (!this.modoVoz && !opts.force) return null;

        const synth = window.speechSynthesis;
        const lang = opts.lang || this.idiomaActual || 'es-AR';
        let voice = this._selectVoice(lang);

        if (!voice && !this._voicesReady && !opts._retry) {
            const retry = () => this._speakText(text, { ...opts, _retry: true });
            synth.addEventListener('voiceschanged', retry, { once: true });
            setTimeout(() => {
                if (!this._voicesReady) this._speakText(text, { ...opts, _retry: true });
            }, 700);
            return null;
        }

        // Si no existe una voz del idioma solicitado, no usamos una voz de otro idioma.
        if (!voice) {
            console.warn(`[MBS TTS] No hay voz compatible con ${lang}. Se omite la locución.`);
            this._updateVoiceStatus();
            if (typeof opts.onerror === 'function') opts.onerror(new Error('VOICE_NOT_AVAILABLE'));
            return null;
        }

        const utt = new SpeechSynthesisUtterance(text);
        utt.lang = voice.lang || lang;
        utt.voice = voice;
        utt.rate = opts.rate || 1.0;
        utt.pitch = opts.pitch || 1.0;
        utt.volume = opts.volume || 1.0;
        if (typeof opts.onend === 'function') utt.onend = opts.onend;
        if (typeof opts.onerror === 'function') utt.onerror = opts.onerror;
        if (opts.cancel !== false) synth.cancel();
        synth.speak(utt);
        this._updateVoiceStatus();
        return utt;
    },

    // ===== DICCIONARIO i18n =====
    I18N: {
        'es-AR': {
            lbl_celda:'CELDA BRAILLE', lbl_metricas:'MÉTRICAS EN TIEMPO REAL',
            lbl_velocidad:'VELOCIDAD MÁXIMA', lbl_idioma:'IDIOMA',
            lbl_texto:'TEXTO GENERADO', lbl_braille_texto:'TEXTO BRAILLE', lbl_sesion:'SESIÓN Y ACCIONES',
            lbl_placeholder:'Esperando entrada del teclado Braille...',
            lbl_wpm:'WPM', lbl_chars:'CARACTERES', lbl_words:'PALABRAS', lbl_ms:'ms/TECLA',
            lbl_wpmbar:'Velocidad relativa (max 60 WPM)',
            btn_iniciar:'Iniciar Sesión', btn_detener:'Detener Sesión',
            btn_sonido_on:'Sonido: ON', btn_sonido_off:'Sonido: OFF',
            btn_limpiar:'Limpiar', btn_txt:'Exportar TXT', btn_csv:'Exportar CSV',
            modal_titulo:'RESUMEN DE SESIÓN', modal_wpm:'WPM promedio',
            modal_chars:'Caracteres', modal_words:'Palabras', modal_dur:'Duración',
            modal_avgms:'ms/tecla prom.', modal_maxwpm:'WPM máximo',
            modal_cerrar:'Cerrar', modal_csv:'Descargar CSV',
            btn_voz_on:'Voz: ON', btn_voz_off:'Voz: OFF',
            lbl_sonido_tipo:'Tipo de sonido',
            tts_iniciar:'Iniciar sesión', tts_detener:'Detener sesión',
            tts_sonido_on:'Sonido activado', tts_sonido_off:'Sonido desactivado',
            tts_limpiar:'Limpiar', tts_csv:'Exportar C S V', tts_txt:'Exportar texto',
            tts_velocidad:'Velocidad',
            tts_listo:'Sistema listo', tts_idioma:'Español',
            btn_click_on:'Click: ON', btn_click_off:'Click: OFF',
            tts_click_on:'Click activado', tts_click_off:'Click desactivado',
			tts_comilla: "Comilla",
			tts_apostrofe: "Apóstrofe",
            tts_btn_reproducir: '▶ Reproducir',
            tts_btn_reproduciendo: '⏸ Reproduciendo...',
            tts_btn_repetir: '↺ Repetir'
        },
        'pt-BR': {
            lbl_celda:'CÉLULA BRAILLE', lbl_metricas:'MÉTRICAS EM TEMPO REAL',
            lbl_velocidad:'VELOCIDADE MÁXIMA', lbl_idioma:'IDIOMA',
            lbl_texto:'TEXTO GERADO', lbl_braille_texto:'TEXTO BRAILLE', lbl_sesion:'SESSÃO E AÇÕES',
            lbl_placeholder:'Aguardando entrada do teclado Braille...',
            lbl_wpm:'PPM', lbl_chars:'CARACTERES', lbl_words:'PALAVRAS', lbl_ms:'ms/TECLA',
            lbl_wpmbar:'Velocidade relativa (máx 60 PPM)',
            btn_iniciar:'Iniciar Sessão', btn_detener:'Encerrar Sessão',
            btn_sonido_on:'Som: ON', btn_sonido_off:'Som: OFF',
            btn_limpiar:'Limpar', btn_txt:'Exportar TXT', btn_csv:'Exportar CSV',
            modal_titulo:'RESUMO DA SESSÃO', modal_wpm:'PPM médio',
            modal_chars:'Caracteres', modal_words:'Palavras', modal_dur:'Duração',
            modal_avgms:'ms/tecla méd.', modal_maxwpm:'PPM máximo',
            modal_cerrar:'Fechar', modal_csv:'Baixar CSV',
            tts_listo:'Sistema pronto', tts_idioma:'Português',
            btn_voz_on:'Voz: ON', btn_voz_off:'Voz: OFF',
            lbl_sonido_tipo:'Tipo de som',
            tts_iniciar:'Iniciar sessão', tts_detener:'Encerrar sessão',
            tts_sonido_on:'Som ativado', tts_sonido_off:'Som desativado',
            tts_limpiar:'Limpar', tts_csv:'Exportar C S V', tts_txt:'Exportar texto',
            tts_velocidad:'Velocidade',
            btn_click_on:'Click: ON', btn_click_off:'Click: OFF',
            tts_click_on:'Click ativado', tts_click_off:'Click desativado',
			tts_comilla: "Aspas",
			tts_apostrofe: "Apóstrofe",
            tts_btn_reproducir: '▶ Reproduzir',
            tts_btn_reproduciendo: '⏸ Reproduzindo...',
            tts_btn_repetir: '↺ Repetir'
        },
        'fr-FR': {
            lbl_celda:'CELLULE BRAILLE', lbl_metricas:'MÉTRIQUES EN TEMPS RÉEL',
            lbl_velocidad:'VITESSE MAXIMALE', lbl_idioma:'LANGUE',
            lbl_texto:'TEXTE GÉNÉRÉ', lbl_braille_texto:'TEXTE BRAILLE', lbl_sesion:'SESSION ET ACTIONS',
            lbl_placeholder:'En attente de saisie au clavier braille...',
            lbl_wpm:'MPM', lbl_chars:'CARACTÈRES', lbl_words:'MOTS', lbl_ms:'ms/TOUCHE',
            lbl_wpmbar:'Vitesse relative (max. 60 MPM)',
            btn_iniciar:'Démarrer la session', btn_detener:'Arrêter la session',
            btn_sonido_on:'Son : ON', btn_sonido_off:'Son : OFF',
            btn_limpiar:'Effacer', btn_txt:'Exporter TXT', btn_csv:'Exporter CSV',
            modal_titulo:'RÉSUMÉ DE SESSION', modal_wpm:'MPM moyen',
            modal_chars:'Caractères', modal_words:'Mots', modal_dur:'Durée',
            modal_avgms:'ms/touche moy.', modal_maxwpm:'MPM maximum',
            modal_cerrar:'Fermer', modal_csv:'Télécharger CSV',
            tts_listo:'Système prêt', tts_idioma:'Français',
            btn_voz_on:'Voix : ON', btn_voz_off:'Voix : OFF',
            lbl_sonido_tipo:'Type de son',
            tts_iniciar:'Session démarrée', tts_detener:'Session arrêtée',
            tts_sonido_on:'Son activé', tts_sonido_off:'Son désactivé',
            tts_limpiar:'Effacer', tts_csv:'Exporter C S V', tts_txt:'Exporter le texte',
            tts_velocidad:'Vitesse',
            btn_click_on:'Clic : ON', btn_click_off:'Clic : OFF',
            tts_click_on:'Clic activé', tts_click_off:'Clic désactivé',
            tts_comilla:'Guillemet', tts_apostrofe:'Apostrophe',
            tts_btn_reproducir:'▶ Lire',
            tts_btn_reproduciendo:'⏸ Lecture...',
            tts_btn_repetir:'↺ Relire'
        },
        'en-US': {
            lbl_celda:'BRAILLE CELL', lbl_metricas:'REAL-TIME METRICS',
            lbl_velocidad:'MAX SPEED', lbl_idioma:'LANGUAGE',
            lbl_texto:'GENERATED TEXT', lbl_braille_texto:'BRAILLE TEXT', lbl_sesion:'SESSION & ACTIONS',
            lbl_placeholder:'Waiting for Braille keyboard input...',
            lbl_wpm:'WPM', lbl_chars:'CHARACTERS', lbl_words:'WORDS', lbl_ms:'ms/KEY',
            lbl_wpmbar:'Relative speed (max 60 WPM)',
            btn_iniciar:'Start Session', btn_detener:'Stop Session',
            btn_sonido_on:'Sound: ON', btn_sonido_off:'Sound: OFF',
            btn_limpiar:'Clear', btn_txt:'Export TXT', btn_csv:'Export CSV',
            modal_titulo:'SESSION SUMMARY', modal_wpm:'Avg WPM',
            modal_chars:'Characters', modal_words:'Words', modal_dur:'Duration',
            modal_avgms:'avg ms/key', modal_maxwpm:'Max WPM',
            modal_cerrar:'Close', modal_csv:'Download CSV',
            tts_listo:'System ready', tts_idioma:'English',
            btn_voz_on:'Voice: ON', btn_voz_off:'Voice: OFF',
            lbl_sonido_tipo:'Sound type',
            tts_iniciar:'Session started', tts_detener:'Session stopped',
            tts_sonido_on:'Sound on', tts_sonido_off:'Sound off',
            tts_limpiar:'Clear', tts_csv:'Export C S V', tts_txt:'Export text',
            tts_velocidad:'Speed',
            btn_click_on:'Click: ON', btn_click_off:'Click: OFF',
            tts_click_on:'Click on', tts_click_off:'Click off',
            tts_comilla:'Quote', tts_apostrofe:'Apostrophe',
            tts_btn_reproducir: '▶ Play',
            tts_btn_reproduciendo: '⏸ Playing...',
            tts_btn_repetir: '↺ Repeat'
        }
    },

    _tts: function(clave) {
        if (!this.modoVoz) return;
        
        // Si el muro está levantado y NO es una comilla/apóstrofe, nos callamos
        if (this._bloqueoLecturaAuto && !clave.startsWith('tts_')) return;

        const T = this.I18N[this.idiomaActual] || this.I18N['es-AR'];
        let textoParaDecir = T[clave] || clave; 

        if (textoParaDecir === 'tts_comilla') textoParaDecir = 'Comilla';
        if (textoParaDecir === 'tts_apostrofe') textoParaDecir = 'Apóstrofe';
        this._speakText(textoParaDecir, { cancel: true });
    },

    _aplicarIdioma: function() {
        const T = this.I18N[this.idiomaActual] || this.I18N['es-AR'];
        const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
        const ph  = (id, val) => { const el = document.getElementById(id); if (el) el.placeholder  = val; };

        set('lbl_celda', T.lbl_celda);
        set('lbl_metricas', T.lbl_metricas);
        set('lbl_velocidad', T.lbl_velocidad);
        set('lbl_idioma', T.lbl_idioma);
        set('lbl_texto', T.lbl_texto);
        set('lbl_braille_texto', T.lbl_braille_texto);
        set('lbl_sesion', T.lbl_sesion);
        ph ('buffer', T.lbl_placeholder);

        set('lbl_wpm', T.lbl_wpm);
        set('lbl_chars', T.lbl_chars);
        set('lbl_words', T.lbl_words);
        set('lbl_ms', T.lbl_ms);
        set('lbl_wpmbar', T.lbl_wpmbar);

        const btnSesion = document.getElementById('btnSesion');
        if (btnSesion) btnSesion.innerHTML = this.sesionActiva
            ? `<span>■</span> ${T.btn_detener}`
            : `<span>▶</span> ${T.btn_iniciar}`;

        const btnSonido = document.getElementById('btnSonido');
        if (btnSonido) btnSonido.innerHTML = this.modoVoz
            ? `<span>🔈</span> ${T.btn_sonido_on}`
            : `<span>🔇</span> ${T.btn_sonido_off}`;

        set('btn_limpiar', T.btn_limpiar);
        set('btn_txt', T.btn_txt);
        set('btn_csv_btn', T.btn_csv);
        set('modal_titulo', T.modal_titulo);
        set('resLblWpm', T.modal_wpm);
        set('resLblChars', T.modal_chars);
        set('resLblWords', T.modal_words);
        set('resLblDur', T.modal_dur);
        set('resLblAvgMs', T.modal_avgms);
        set('resLblMaxWpm', T.modal_maxwpm);
        set('btn_modal_cerrar', T.modal_cerrar);
        set('btn_modal_csv', T.modal_csv);
        this._updateDemoLanguage();
        this._updateVoiceStatus();
    },

    setLang: function(lang) {
        // Cortar inmediatamente cualquier frase de la voz anterior. El foco del botón
        // ya no genera TTS para los idiomas, evitando que la primera palabra salga
        // con el acento del idioma previo.
        if ('speechSynthesis' in window) window.speechSynthesis.cancel();
        clearTimeout(this._langTtsTimer);

        if (this.ws && this.ws.readyState === WebSocket.OPEN) this.ws.send(lang);
        if      (lang === 'SET_ES') this.idiomaActual = 'es-AR';
        else if (lang === 'SET_PT') this.idiomaActual = 'pt-BR';
        else if (lang === 'SET_EN') this.idiomaActual = 'en-US';
        else if (lang === 'SET_FR') this.idiomaActual = 'fr-FR';

        const targetLang = this.idiomaActual;

        document.getElementById('btnES').classList.toggle('active', lang === 'SET_ES');
        document.getElementById('btnPT').classList.toggle('active', lang === 'SET_PT');
        const btnEN = document.getElementById('btnEN');
        if (btnEN) btnEN.classList.toggle('active', lang === 'SET_EN');
        const btnFR = document.getElementById('btnFR');
        if (btnFR) btnFR.classList.toggle('active', lang === 'SET_FR');

        this._aplicarIdioma();
        this._applyLessonLanguage();
        const T = this.I18N[targetLang];
        this._updateDemoLanguage();
        this._updateVoiceStatus();

        // Pequeña espera para que el navegador estabilice la voz recién seleccionada.
        // El chequeo de targetLang evita anunciar un idioma viejo si el usuario cambia
        // muy rápido entre botones.
        this._langTtsTimer = setTimeout(() => {
            if (this.idiomaActual !== targetLang) return;
            this._speakText(T.tts_idioma, { cancel: true, force: true, lang: targetLang });
        }, 250);
    },

    downloadCSV: function() {
        if (this.logData.length === 0) return;
        this._tts('tts_csv');

        // Escapa comillas dobles dentro de celdas CSV (RFC 4180)
        const esc = (v) => String(v).replace(/"/g, '""');

        // ── Filas de datos ────────────────────────────────────────────
        let csv = "\ufeffHora,Dif_ms,Hex,Char,wpm_acum,pausa,seg_sesion\n";
        this.logData.forEach(r => {
            csv += `${r.hora},${r.ms_dif},${r.mask},"${esc(r.char)}",${r.wpm_acum},${r.pausa},${r.seg_sesion}\n`;
        });

        // ── Bloque de resumen al final ────────────────────────────────
        const texto  = this.buffer ? this.buffer.value : "";
        const words  = texto.trim().split(/\s+/).filter(w => w.length > 0).length;
        const seg    = Math.round((performance.now() - this.t_inicio_sesion) / 1000);
        const minutos = seg / 60;
        const wpmProm = minutos > 0 ? Math.round(words / minutos) : 0;
        const avgMs  = this._metIntervals.length > 0
            ? Math.round(this._metIntervals.reduce((a,b) => a+b, 0) / this._metIntervals.length) : null;
        const sigma  = this._sigma(this._metIntervals);
        const p50    = this._percentil(this._metIntervals, 50);
        const p90    = this._percentil(this._metIntervals, 90);
        const mm = String(Math.floor(seg/60)).padStart(2,'0');
        const ss = String(seg%60).padStart(2,'0');
        const fmt = (v, suf='') => (v !== null && v !== undefined) ? v+suf : '-';

        csv += `\n`;
        csv += `\"--- RESUMEN DE SESION ---\",,,,,, \n`;
        csv += `Alumno,"${esc(this.nombreUsuario)}",,,,, \n`;
        csv += `Duracion,"${mm}:${ss}",,,,, \n`;
        csv += `Palabras,${words},,,,, \n`;
        csv += `Caracteres,${texto.replace(/\s/g,'').length},,,,, \n`;
        csv += `WPM_promedio,${wpmProm},,,,, \n`;
        csv += `WPM_sostenido,${this._wpmSostenido},,,,, \n`;
        csv += `WPM_pico,${this._wpmPico},,,,, \n`;
        csv += `WPM_maximo_hist,${this.maxWpmSesion},,,,, \n`;
        csv += `ms_tecla_promedio,${fmt(avgMs)},,,,, \n`;
        csv += `sigma_regularidad,${fmt(sigma)},,,,, \n`;
        csv += `P50_ms_tecla,${fmt(p50)},,,,, \n`;
        csv += `P90_ms_tecla,${fmt(p90)},,,,, \n`;
        csv += `Pausas_largas,${this._pausasCount},,,,, \n`;

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `${this.nombreUsuario}.csv`;
        a.click();
    },

    downloadTXT: function() {
        const contenido = this.buffer ? this.buffer.value : "";
        if (!contenido) return;
        this._tts('tts_txt');
        const blob = new Blob([contenido], { type: 'text/plain' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `${this.nombreUsuario}_texto.txt`;
        a.click();
    },

    toggleSonido: function() {
        this.modoVoz = !this.modoVoz;
        const T = this.I18N[this.idiomaActual] || this.I18N['es-AR'];
        const btn = document.getElementById('btnSonido');
        if (btn) btn.innerHTML = this.modoVoz
            ? `<span>🔈</span> ${T.btn_sonido_on}`
            : `<span>🔇</span> ${T.btn_sonido_off}`;
        const clave = this.modoVoz ? 'tts_sonido_on' : 'tts_sonido_off';
        this._speakText(T[clave], { cancel: true, force: true });
    },

    toggleClick: function() {
        this.tipoSonido = (this.tipoSonido === 'click') ? 'off' : 'click';
        const activo = this.tipoSonido === 'click';
        const T = this.I18N[this.idiomaActual] || this.I18N['es-AR'];
        const lbl = document.getElementById('btn_click');
        const btn = document.getElementById('btnClick');
        if (lbl) lbl.textContent = activo
            ? (T.btn_click_on  || 'Click: ON')
            : (T.btn_click_off || 'Click: OFF');
        if (btn) {
            btn.style.borderColor = activo ? 'var(--accent-green)' : '';
            btn.style.color       = activo ? 'var(--accent-green)' : '';
        }
        if (activo) this._beep('ok');  // muestra de como suena
        // Sincronizar vibrador fisico del ESP32 con el estado del click
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(activo ? 'VIB_ON' : 'VIB_OFF');
        }
    },

    // Mini-modal no bloqueante para pedir nombre del alumno
    _pedirNombreYArrancar: function() {
        // Crear overlay si no existe
        let overlay = document.getElementById('modalNombreOverlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'modalNombreOverlay';
            overlay.style.cssText = [
                'position:fixed','inset:0','z-index:9500',
                'background:rgba(6,10,15,0.92)','backdrop-filter:blur(6px)',
                'display:flex','align-items:center','justify-content:center'
            ].join(';');
            overlay.innerHTML = `
                <div style="background:#0b1017;border:1px solid #2a3f55;border-radius:12px;padding:28px 32px;width:340px;max-width:92vw;">
                  <div style="font-family:'Space Mono',monospace;font-size:0.65rem;color:#3a5068;letter-spacing:0.15em;border-left:2px solid #2d8cf0;padding-left:8px;margin-bottom:16px;">INICIAR SESIÓN</div>
                  <div style="font-family:'Space Mono',monospace;font-size:0.82rem;color:#6b8aaa;margin-bottom:8px;">Nombre del alumno</div>
                  <input id="inputNombreAlumno" type="text" autocomplete="off"
                    style="width:100%;background:#080d14;border:1px solid #1c2a38;color:#dce8f5;padding:10px 12px;border-radius:6px;font-family:'Space Mono',monospace;font-size:1rem;outline:none;margin-bottom:16px;"
                    placeholder="Nombre...">
                  <div style="display:flex;gap:8px;">
                    <button id="btnNombreCancelar"
                      style="flex:1;background:#0f1620;color:#6b8aaa;border:1px solid #1c2a38;border-radius:6px;padding:10px;font-family:'Space Mono',monospace;font-size:0.8rem;cursor:pointer;">
                      Cancelar
                    </button>
                    <button id="btnNombreOk"
                      style="flex:1;background:rgba(0,214,143,0.1);color:#00d68f;border:1px solid #00d68f;border-radius:6px;padding:10px;font-family:'Space Mono',monospace;font-size:0.8rem;font-weight:700;cursor:pointer;">
                      Iniciar
                    </button>
                  </div>
                </div>`;
            document.body.appendChild(overlay);
        }

        const input  = document.getElementById('inputNombreAlumno');
        const btnOk  = document.getElementById('btnNombreOk');
        const btnCan = document.getElementById('btnNombreCancelar');

        input.value = this.nombreUsuario !== 'ANONIMO' ? this.nombreUsuario : '';
        overlay.style.display = 'flex';
        setTimeout(() => input.focus(), 80);

        const arrancar = () => {
            const nombre = input.value.trim();
            this.nombreUsuario = nombre || 'ANONIMO';
            overlay.style.display = 'none';
            this._iniciarSesion();
        };

        btnOk.onclick  = arrancar;
        btnCan.onclick = () => { overlay.style.display = 'none'; };
        input.onkeydown = (e) => { if (e.key === 'Enter') arrancar(); };
    },

    _iniciarSesion: function() {
        const btn = document.getElementById('btnSesion');
        this._tts('tts_iniciar');
        this.sesionActiva    = true;
        this.logData         = [];
        this.maxWpmSesion    = 0;
        this._wpmPico        = 0;
        this._ventana30s     = [];
        this._wpmSostenido   = 0;
        this._pausasCount    = 0;
        this._segActivos     = 0;
        this.t_inicio_sesion = performance.now();
        this.t_ultima_tecla  = 0;
        this._tPrimeraTecla  = performance.now();
        this._metIntervals   = [];
        if (btn) {
            btn.innerHTML = '<span class="btn-icon">■</span> Detener Sesión';
            btn.classList.add('detener');
        }
        this._iniciarTimer();
    },



    // ===== CONTROLES DE TEXTO DE PRUEBA =====
    _ensureDemoControls: function() {
        if (document.getElementById('demoInput')) return;
        const langCard = document.querySelector('.lang-card');
        if (!langCard) return;

        const card = document.createElement('div');
        card.id = 'demoTextCard';
        card.style.cssText = 'background:var(--bg-panel);border:1px solid var(--border);border-radius:var(--radius-md);padding:18px;margin-bottom:14px;';
        card.innerHTML = `
            <div class="panel-label"><span id="lbl_demo_text">TEXTO DE PRUEBA</span></div>
            <textarea id="demoInput" rows="2" style="width:100%;box-sizing:border-box;font-family:var(--font-mono);font-size:1rem;line-height:1.45;padding:12px;background:var(--bg-input);color:var(--text-primary);border:1px solid var(--border);border-radius:var(--radius-sm);resize:vertical;outline:none;" placeholder="Escribí un texto para probar la celda Braille y la voz"></textarea>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px;">
                <button id="demoRunBtn" type="button" class="btn-action"><span id="btn_demo_run">▶ Enviar prueba</span></button>
                <button id="demoQuickBtn" type="button" class="btn-action"><span id="btn_demo_example">Ejemplo</span></button>
            </div>
            <div id="demoVoiceStatus" style="margin-top:9px;font-family:var(--font-mono);font-size:.68rem;color:var(--text-muted);" aria-live="polite"></div>
        `;
        langCard.insertAdjacentElement('afterend', card);
        document.getElementById('demoRunBtn').addEventListener('click', () => this.demoRun());
        document.getElementById('demoQuickBtn').addEventListener('click', () => this.demoQuick());
        const input = document.getElementById('demoInput');
        if (input) {
            input.addEventListener('keydown', e => {
                if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                    e.preventDefault();
                    this.demoRun();
                }
            });
        }
        this._updateDemoLanguage();
        this._updateVoiceStatus();
    },

    _updateDemoLanguage: function() {
        const D = {
            'es-AR': { title:'TEXTO DE PRUEBA', placeholder:'Escribí un texto para probar la celda Braille y la voz', run:'▶ Enviar prueba', example:'Ejemplo' },
            'pt-BR': { title:'TEXTO DE TESTE', placeholder:'Digite um texto para testar a célula Braille e a voz', run:'▶ Enviar teste', example:'Exemplo' },
            'en-US': { title:'TEST TEXT', placeholder:'Type text to test the Braille cell and voice', run:'▶ Run test', example:'Example' },
            'fr-FR': { title:'TEXTE DE TEST', placeholder:'Saisissez un texte pour tester la cellule braille et la voix', run:'▶ Lancer le test', example:'Exemple' }
        };
        const t = D[this.idiomaActual] || D['es-AR'];
        const set = (id, value) => { const el = document.getElementById(id); if (el) el.textContent = value; };
        set('lbl_demo_text', t.title);
        set('btn_demo_run', t.run);
        set('btn_demo_example', t.example);
        const input = document.getElementById('demoInput');
        if (input) {
            input.placeholder = t.placeholder;

            // El cuadro de prueba queda libre para que el usuario escriba su propio texto.
            // Los ejemplos estándar solo aparecen al pulsar el botón Ejemplo.
            // Si había quedado visible un ejemplo de otro idioma, se limpia al cambiar.
            const current = input.value.trim();
            const isStandardExample = current && Object.values(this.DEMO_EXAMPLES)
                .some(example => example.trim() === current);
            if (isStandardExample) input.value = '';
        }
    },

    // ===== DEMO SIN ESP32 =====
    _tablaActual: function() {
        if (this.idiomaActual === 'pt-BR') return this.TABLA_PT;
        if (this.idiomaActual === 'fr-FR') return this.TABLA_FR;
        return this.TABLA_ES;
    },

    _maskParaCaracter: function(ch) {
        if (ch === ' ' || ch === '\n') return 0;
        const lower = ch.toLowerCase();
        const tabla = this._tablaActual();
        for (const [mask, val] of Object.entries(tabla)) {
            if (val === lower) return parseInt(mask, 10);
        }
        for (const [mask, val] of Object.entries(this.TABLA_NUM)) {
            if (val === ch) return parseInt(mask, 10);
        }
        return 0;
    },

    // Convierte directamente la máscara de 6 puntos al bloque Unicode Braille.
    // Unicode Braille usa la misma correspondencia binaria para los puntos 1..6:
    // U+2800 + máscara.
    _brailleDesdeMask: function(mask) {
        return String.fromCodePoint(0x2800 + (mask & 0x3F));
    },

    _appendBrailleDemo: function(ch, mask) {
        if (!this.brailleBuffer) return;

        if (ch === "\n") {
            this.brailleBuffer.textContent += "\n";
            return;
        }
        if (ch === " ") {
            this.brailleBuffer.textContent += " ";
            return;
        }

        // Fase 1: representación directa de la celda correspondiente al carácter.
        // Mayúsculas y prefijo numérico se validarán en la fase siguiente.
        if (mask) {
            this.brailleBuffer.textContent += this._brailleDesdeMask(mask);
        } else {
            this.brailleBuffer.textContent += "□";
        }

        this.brailleBuffer.scrollTop = this.brailleBuffer.scrollHeight;
    },

    _registrarDemoChar: function(charFinal, mask, msDif) {
        const ahora = performance.now();
        if (this.sesionActiva) {
            this.logData.push({
                hora: new Date().toLocaleTimeString(),
                ms_dif: msDif,
                mask: "0x" + mask.toString(16).toUpperCase().padStart(2, '0'),
                char: charFinal === " " ? "[ESPACIO]" : (charFinal === "\n" ? "[ENTER]" : charFinal),
                wpm_acum: document.getElementById('wpmValue').textContent,
                pausa: (msDif > 3000) ? "SI" : "NO",
                seg_sesion: Math.floor((ahora - this.t_inicio_sesion) / 1000)
            });
            this._actualizarMetricas(msDif);
        } else {
            this._actualizarMetricas(msDif);
        }
        this.t_ultima_tecla = ahora;
    },

    _demoEmitChar: function(ch) {
        const ahora = performance.now();
        const msDif = this.t_ultima_tecla ? Math.round(ahora - this.t_ultima_tecla) : 0;
        const mask = this._maskParaCaracter(ch);

        this.updateDots(mask);
        if (this.maskHex) this.maskHex.textContent = "0x" + mask.toString(16).toUpperCase().padStart(2, '0');
        if (this.bigChar) this.bigChar.textContent = ch === " " ? "␣" : (ch === "\n" ? "↵" : ch);
        if (this.buffer) {
            this.buffer.value += ch;
            this.buffer.scrollTop = this.buffer.scrollHeight;
        }
        this._appendBrailleDemo(ch, mask);

        this._registrarDemoChar(ch, mask, msDif);
        this._beep('ok');

        if (ch === " " || ch === "\n") {
            if (this.modoVoz && this.palabraActual) {
                this._speakText(this.palabraActual, { cancel: false });
            }
            this.palabraActual = "";
        } else {
            this.palabraActual += ch;
        }
    },

    _demoPlayText: function(texto) {
        if (!texto) return;
        window.speechSynthesis.cancel();
        this._demoQueue = Array.from(texto);
        clearInterval(this._demoTimer);
        const wpm = parseInt(document.getElementById('speedValue')?.textContent || '20', 10);
        const intervalo = Math.max(80, Math.round(60000 / (Math.max(wpm, 1) * 5)));
        this._demoTimer = setInterval(() => {
            const ch = this._demoQueue.shift();
            if (ch === undefined) {
                clearInterval(this._demoTimer);
                return;
            }
            this._demoEmitChar(ch);
        }, intervalo);
    },

    demoRun: function() {
        const txt = (document.getElementById('demoInput')?.value || '').trim();
        if (!txt) return;

        // Antes de iniciar una nueva prueba, cortar cualquier locución pendiente
        // (por ejemplo, la lectura automática de un botón que acababa de recibir foco).
        if ('speechSynthesis' in window) window.speechSynthesis.cancel();

        clearInterval(this._demoTimer);
        if (this.buffer) this.buffer.value = '';
        if (this.brailleBuffer) this.brailleBuffer.textContent = '';
        this.palabraActual = '';
        this.t_ultima_tecla = 0;
        const textoConCierre = /[\s\n]$/.test(txt) ? txt : txt + ' ';
        this._demoPlayText(textoConCierre);
    },

    demoQuick: function() {

    const txt = this.DEMO_EXAMPLES[this.idiomaActual] || this.DEMO_EXAMPLES['es-AR'];

    const input = document.getElementById('demoInput');
    if (input) input.value = txt;

    if (this.buffer) {
        this.buffer.value = "INICIANDO DEMOSTRACIÓN...\n";
    }
    if (this.brailleBuffer) {
        this.brailleBuffer.textContent = "";
    }

    let dot = 1;

    const barrido = setInterval(() => {

        for (let i = 1; i <= 6; i++) {
            if (this.dots[i]) {
                this.dots[i].classList.remove('active');
            }
        }

        if (dot <= 6) {
            if (this.dots[dot]) {
                this.dots[dot].classList.add('active');
            }
            dot++;
        } else {
            clearInterval(barrido);

            for (let i = 1; i <= 6; i++) {
                if (this.dots[i]) {
                    this.dots[i].classList.remove('active');
                }
            }

            this._demoPlayText(txt);
        }

    }, 120);
},
    // ===== LECCIONES GUIADAS (DEMO PÚBLICA) =====
    _lessonStrings: function() {
        const all = {
            'es-AR': {
                toggle:'Lecciones', mode:'🎓 MODO LECCIONES', subtitle:'Prueba de concepto pedagógica',
                close:'Cerrar panel de lecciones', l1:'Lección 1', l1d:'Primeras letras: a–f',
                l2:'Lección 2', l2d:'Primera palabra: CASA', generic:'Lección', pressKey:'Pulsa una tecla',
                hits:'Aciertos', errors:'Errores', exit:'Salir de la lección',
                note:'En la demo se responde con el teclado convencional. En el MBS real, mediante el teclado braille físico.',
                titleLetters:'Lección 1 — Primeras letras', titleWord:'Lección 2 — Primera palabra',
                press:'Pulsa la letra', correct:'Correcto', wrong:(c)=>`Pulsaste “${c}”. Intenta nuevamente.`,
                wrongVoice:'No es correcto. Intenta nuevamente.', completed:'Lección completada',
                result:(h,e)=>`¡Muy bien! ${h} aciertos y ${e} errores.`,
                resultVoice:(h,e)=>`Lección completada. ${h} aciertos y ${e} errores.`, of:'de'
            },
            'pt-BR': {
                toggle:'Lições', mode:'🎓 MODO LIÇÕES', subtitle:'Prova de conceito pedagógica',
                close:'Fechar painel de lições', l1:'Lição 1', l1d:'Primeiras letras: a–f',
                l2:'Lição 2', l2d:'Primeira palavra: LAR', generic:'Lição', pressKey:'Pressione uma tecla',
                hits:'Acertos', errors:'Erros', exit:'Sair da lição',
                note:'Na demonstração, a resposta é feita com o teclado convencional. No MBS real, com o teclado braille físico.',
                titleLetters:'Lição 1 — Primeiras letras', titleWord:'Lição 2 — Primeira palavra',
                press:'Pressione a letra', correct:'Correto', wrong:(c)=>`Você pressionou “${c}”. Tente novamente.`,
                wrongVoice:'Não está correto. Tente novamente.', completed:'Lição concluída',
                result:(h,e)=>`Muito bem! ${h} acertos e ${e} erros.`,
                resultVoice:(h,e)=>`Lição concluída. ${h} acertos e ${e} erros.`, of:'de'
            },
            'fr-FR': {
                toggle:'Leçons', mode:'🎓 MODE LEÇONS', subtitle:'Preuve de concept pédagogique',
                close:'Fermer le panneau des leçons', l1:'Leçon 1', l1d:'Premières lettres : a–f',
                l2:'Leçon 2', l2d:'Premier mot : MAISON', generic:'Leçon', pressKey:'Appuyez sur une touche',
                hits:'Réussites', errors:'Erreurs', exit:'Quitter la leçon',
                note:'Dans la démo, la réponse se fait avec le clavier conventionnel. Dans le MBS réel, avec le clavier braille physique.',
                titleLetters:'Leçon 1 — Premières lettres', titleWord:'Leçon 2 — Premier mot',
                press:'Appuyez sur la lettre', correct:'Correct', wrong:(c)=>`Vous avez appuyé sur « ${c} ». Réessayez.`,
                wrongVoice:'Ce n’est pas correct. Réessayez.', completed:'Leçon terminée',
                result:(h,e)=>`Très bien ! ${h} réussites et ${e} erreurs.`,
                resultVoice:(h,e)=>`Leçon terminée. ${h} réussites et ${e} erreurs.`, of:'sur'
            },
            'en-US': {
                toggle:'Lessons', mode:'🎓 LESSON MODE', subtitle:'Pedagogical proof of concept',
                close:'Close lessons panel', l1:'Lesson 1', l1d:'First letters: a–f',
                l2:'Lesson 2', l2d:'First word: HOUSE', generic:'Lesson', pressKey:'Press a key',
                hits:'Correct', errors:'Errors', exit:'Exit lesson',
                note:'In the demo, responses use a conventional keyboard. In the real MBS, they use the physical braille keyboard.',
                titleLetters:'Lesson 1 — First letters', titleWord:'Lesson 2 — First word',
                press:'Press the letter', correct:'Correct', wrong:(c)=>`You pressed “${c}”. Try again.`,
                wrongVoice:'That is not correct. Try again.', completed:'Lesson completed',
                result:(h,e)=>`Well done! ${h} correct and ${e} errors.`,
                resultVoice:(h,e)=>`Lesson completed. ${h} correct and ${e} errors.`, of:'of'
            }
        };
        return all[this.idiomaActual] || all['es-AR'];
    },

    _applyLessonLanguage: function() {
        const L = this._lessonStrings();
        const set = (id, text) => { const el=document.getElementById(id); if(el) el.textContent=text; };
        set('lessonToggleText', L.toggle); set('lessonModeLabel', L.mode); set('lessonSubtitle', L.subtitle);
        set('lesson1Title', L.l1); set('lesson1Desc', L.l1d); set('lesson2Title', L.l2); set('lesson2Desc', L.l2d);
        set('lessonHitsLabel', L.hits); set('lessonErrorsLabel', L.errors); set('lessonExitBtn', L.exit); set('lessonNote', L.note);
        const sidebar=document.getElementById('lessonSidebar'); if(sidebar) sidebar.setAttribute('aria-label', L.toggle);
        const close=document.getElementById('lessonCloseBtn'); if(close) close.setAttribute('aria-label', L.close);
        if (this.lessonActive && this.lesson) {
            const title=document.getElementById('lessonTitle');
            if(title) title.textContent=this.lesson.type==='letters'?L.titleLetters:L.titleWord;
            this._renderLesson();
        } else {
            set('lessonTitle', L.generic); set('lessonInstruction', L.pressKey);
        }
    },

    toggleLessonSidebar: function(forceOpen) {
        const sidebar = document.getElementById('lessonSidebar');
        const toggle = document.getElementById('lessonSidebarToggle');
        const backdrop = document.getElementById('lessonSidebarBackdrop');
        if (!sidebar) return;
        const shouldOpen = typeof forceOpen === 'boolean' ? forceOpen : !sidebar.classList.contains('open');
        sidebar.classList.toggle('open', shouldOpen);
        document.body.classList.toggle('lesson-sidebar-open', shouldOpen);
        const mobilePanel = window.matchMedia('(max-width: 900px)').matches;
        if (backdrop) backdrop.classList.toggle('open', shouldOpen && mobilePanel);
        sidebar.setAttribute('aria-hidden', shouldOpen ? 'false' : 'true');
        if (toggle) toggle.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
    },

    startLesson: function(type) {
        this.toggleLessonSidebar(true);
        const wordLessons = {
            'es-AR': { sequence:['c','a','s','a'], word:'CASA' },
            'pt-BR': { sequence:['l','a','r'], word:'LAR' },
            'en-US': { sequence:['h','o','u','s','e'], word:'HOUSE' },
            'fr-FR': { sequence:['m','a','i','s','o','n'], word:'MAISON' }
        };
        const wordLesson = wordLessons[this.idiomaActual] || wordLessons['es-AR'];
        const lessons = {
            letters: { type:'letters', sequence: ['a','b','c','d','e','f'] },
            word:    { type:'word', sequence: wordLesson.sequence, word: wordLesson.word }
        };
        const lesson = lessons[type]; if (!lesson) return;
        const L=this._lessonStrings();
        clearInterval(this._demoTimer); window.speechSynthesis.cancel();
        this.lessonActive=true; this.lesson=lesson; this.lessonIndex=0; this.lessonHits=0; this.lessonErrors=0;
        if (document.activeElement && typeof document.activeElement.blur === 'function') document.activeElement.blur();
        const chooser=document.getElementById('lessonChooser'), panel=document.getElementById('lessonPanel');
        if(chooser) chooser.hidden=true; if(panel) panel.hidden=false;
        const title=document.getElementById('lessonTitle'); if(title) title.textContent=type==='letters'?L.titleLetters:L.titleWord;
        this._renderLesson(); this._speakLessonInstruction();
    },

    _renderLesson: function() {
        const L=this._lessonStrings();
        const expected=this.lesson.sequence[this.lessonIndex];
        const instruction=document.getElementById('lessonInstruction'), progress=document.getElementById('lessonProgress');
        const feedback=document.getElementById('lessonFeedback'), hits=document.getElementById('lessonHits'), errors=document.getElementById('lessonErrors');
        if(instruction) instruction.innerHTML=`${L.press} <strong>“${expected.toUpperCase()}”</strong>`;
        if(this.lesson.word) { const chars=this.lesson.sequence.map((ch,i)=>i<this.lessonIndex?ch.toUpperCase():'—'); if(progress) progress.textContent=chars.join(' '); }
        else if(progress) progress.textContent=`${this.lessonIndex+1} ${L.of} ${this.lesson.sequence.length}`;
        if(feedback){feedback.textContent='';feedback.className='lesson-feedback';}
        if(hits) hits.textContent=this.lessonHits; if(errors) errors.textContent=this.lessonErrors;
    },

    _speakLessonText: function(text) {
        if (!this.modoVoz || !text) return;
        this._speakText(text, { cancel: true });
    },

    _speakLessonInstruction: function() {
        if(!this.modoVoz||!this.lessonActive)return;
        const L=this._lessonStrings(), expected=this.lesson.sequence[this.lessonIndex];
        this._speakLessonText(`${L.press} ${expected}`);
    },

    handleLessonKey: function(key) {
        if(!this.lessonActive)return;
        const L=this._lessonStrings(), typed=key.toLowerCase(), expected=this.lesson.sequence[this.lessonIndex].toLowerCase();
        this._demoEmitChar(typed); const feedback=document.getElementById('lessonFeedback');
        if(typed===expected){
            this.lessonHits++; if(feedback){feedback.textContent=`✓ ${L.correct}`;feedback.className='lesson-feedback ok';}
            this.lessonIndex++;
            if(this.lessonIndex>=this.lesson.sequence.length)setTimeout(()=>this._finishLesson(),450);
            else setTimeout(()=>{this._renderLesson();this._speakLessonInstruction();},600);
        } else {
            this.lessonErrors++; if(feedback){feedback.textContent=`✗ ${L.wrong(typed.toUpperCase())}`;feedback.className='lesson-feedback error';}
            const errors=document.getElementById('lessonErrors'); if(errors)errors.textContent=this.lessonErrors;
            if(this.modoVoz) this._speakLessonText(L.wrongVoice);
        }
    },

    _finishLesson: function() {
        const L=this._lessonStrings();
        const instruction=document.getElementById('lessonInstruction'), progress=document.getElementById('lessonProgress');
        const feedback=document.getElementById('lessonFeedback'), hits=document.getElementById('lessonHits');
        if(instruction)instruction.textContent=L.completed;
        if(progress)progress.textContent=this.lesson.word||'a · b · c · d · e · f';
        if(feedback){feedback.textContent=L.result(this.lessonHits,this.lessonErrors);feedback.className='lesson-feedback ok';}
        if(hits)hits.textContent=this.lessonHits;
        if(this.modoVoz) this._speakLessonText(L.resultVoice(this.lessonHits,this.lessonErrors));
        this.lessonActive=false;
    },

    stopLesson: function() {
        this.lessonActive=false; window.speechSynthesis.cancel();
        const chooser=document.getElementById('lessonChooser'), panel=document.getElementById('lessonPanel');
        if(chooser)chooser.hidden=false; if(panel)panel.hidden=true;
        this._applyLessonLanguage();
    },

    clear: function() {
        // Limpiar debe ser una acción silenciosa: no se antepone al próximo texto TTS.
        if ('speechSynthesis' in window) window.speechSynthesis.cancel();
        if (this.buffer) this.buffer.value = "";
        if (this.brailleBuffer) this.brailleBuffer.textContent = "";
        this.palabraActual = "";
        // Reseteo completo de todas las métricas
        this._tPrimeraTecla  = 0;
        this._metIntervals   = [];
        this._pausasCount    = 0;
        this._wpmPico        = 0;
        this._wpmSostenido   = 0;
        this._segActivos     = 0;
        this._ventana30s     = [];
        this.maxWpmSesion    = 0;
        this.t_ultima_tecla  = 0;
        ['wpmValue','totalChars','totalWords'].forEach(id => {
            const el = document.getElementById(id); if (el) el.textContent = "0";
        });
        const avg = document.getElementById('avgInterval'); if (avg) avg.textContent = "—";
        const bar = document.getElementById('wpmBar'); if (bar) bar.style.width = "0%";
    },


};

window.onload = () => APP.init();

// VERSION MBS MULTILINGUE FR + TTS TRANSITION FIX 20260831-V3

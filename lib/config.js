import path from "path";
import { URL } from "node:url"; // in Browser, the URL in native accessible on window

const __dirname = new URL(".", import.meta.url).pathname;

const config = {
    DEFAULTS: {
        workingDirectory: path.join(__dirname, "..", ".local"),
        delimiter: "\n",
        sourceUrls: [
            "https://raw.githubusercontent.com/kkrypt0nn/wordlists/refs/heads/main/wordlists/user_agents/software_name/electron_application.txt",
            "https://raw.githubusercontent.com/kkrypt0nn/wordlists/refs/heads/main/wordlists/user_agents/hardware_type_specific/billboard.txt",
            "https://raw.githubusercontent.com/kkrypt0nn/wordlists/refs/heads/main/wordlists/user_agents/hardware_type_specific/car.txt",
            "https://raw.githubusercontent.com/kkrypt0nn/wordlists/refs/heads/main/wordlists/user_agents/hardware_type_specific/computer.txt",
            "https://raw.githubusercontent.com/kkrypt0nn/wordlists/refs/heads/main/wordlists/user_agents/hardware_type_specific/ebook_reader.txt",
            "https://raw.githubusercontent.com/kkrypt0nn/wordlists/refs/heads/main/wordlists/user_agents/hardware_type_specific/game_console.txt",
            "https://raw.githubusercontent.com/kkrypt0nn/wordlists/refs/heads/main/wordlists/user_agents/hardware_type_specific/glasses.txt",
            "https://raw.githubusercontent.com/kkrypt0nn/wordlists/refs/heads/main/wordlists/user_agents/hardware_type_specific/handheld_game.txt",
            "https://raw.githubusercontent.com/kkrypt0nn/wordlists/refs/heads/main/wordlists/user_agents/hardware_type_specific/large_screen.txt",
            "https://raw.githubusercontent.com/kkrypt0nn/wordlists/refs/heads/main/wordlists/user_agents/hardware_type_specific/media_player.txt",
            "https://raw.githubusercontent.com/kkrypt0nn/wordlists/refs/heads/main/wordlists/user_agents/hardware_type_specific/mobile.txt",
            "https://raw.githubusercontent.com/kkrypt0nn/wordlists/refs/heads/main/wordlists/user_agents/hardware_type_specific/music_player.txt",
            "https://raw.githubusercontent.com/kkrypt0nn/wordlists/refs/heads/main/wordlists/user_agents/hardware_type_specific/pda.txt",
            "https://raw.githubusercontent.com/kkrypt0nn/wordlists/refs/heads/main/wordlists/user_agents/hardware_type_specific/phone.txt",
            "https://raw.githubusercontent.com/kkrypt0nn/wordlists/refs/heads/main/wordlists/user_agents/hardware_type_specific/server.txt",
            "https://raw.githubusercontent.com/kkrypt0nn/wordlists/refs/heads/main/wordlists/user_agents/hardware_type_specific/tablet.txt",
            "https://raw.githubusercontent.com/kkrypt0nn/wordlists/refs/heads/main/wordlists/user_agents/hardware_type_specific/tv.txt",
            "https://raw.githubusercontent.com/kkrypt0nn/wordlists/refs/heads/main/wordlists/passwords/000webhost.txt",
            "https://raw.githubusercontent.com/kkrypt0nn/wordlists/refs/heads/main/wordlists/passwords/bt4_passwords.txt",
            "https://raw.githubusercontent.com/kkrypt0nn/wordlists/refs/heads/main/wordlists/passwords/burnett.txt",
            "https://raw.githubusercontent.com/kkrypt0nn/wordlists/refs/heads/main/wordlists/passwords/common_passwords_win.txt",
            "https://raw.githubusercontent.com/kkrypt0nn/wordlists/refs/heads/main/wordlists/passwords/common_roots.txt",
            "https://raw.githubusercontent.com/kkrypt0nn/wordlists/refs/heads/main/wordlists/passwords/darkweb_2017.txt",
            "https://raw.githubusercontent.com/kkrypt0nn/wordlists/refs/heads/main/wordlists/passwords/db2_default_passwords.txt",
            "https://raw.githubusercontent.com/kkrypt0nn/wordlists/refs/heads/main/wordlists/passwords/default_passwords_for_services.txt",
            "https://raw.githubusercontent.com/kkrypt0nn/wordlists/refs/heads/main/wordlists/passwords/dutch_passwords.txt",
            "https://raw.githubusercontent.com/kkrypt0nn/wordlists/refs/heads/main/wordlists/passwords/hak5.txt",
            "https://raw.githubusercontent.com/kkrypt0nn/wordlists/refs/heads/main/wordlists/passwords/honeynet.txt",
            "https://raw.githubusercontent.com/kkrypt0nn/wordlists/refs/heads/main/wordlists/passwords/http_default_passwords.txt",
            "https://raw.githubusercontent.com/kkrypt0nn/wordlists/refs/heads/main/wordlists/passwords/indian_passwords.txt",
            "https://raw.githubusercontent.com/kkrypt0nn/wordlists/refs/heads/main/wordlists/passwords/ipmi_passwords.txt",
            "https://raw.githubusercontent.com/kkrypt0nn/wordlists/refs/heads/main/wordlists/passwords/keyboard_patterns.txt",
            "https://raw.githubusercontent.com/kkrypt0nn/wordlists/refs/heads/main/wordlists/passwords/md5decryptor.txt",
            "https://raw.githubusercontent.com/kkrypt0nn/wordlists/refs/heads/main/wordlists/passwords/medical_devices_passwords.txt",
            "https://raw.githubusercontent.com/kkrypt0nn/wordlists/refs/heads/main/wordlists/passwords/mirai_passwords.txt",
            "https://raw.githubusercontent.com/kkrypt0nn/wordlists/refs/heads/main/wordlists/passwords/most_used_passwords_ncsc.txt",
            "https://raw.githubusercontent.com/kkrypt0nn/wordlists/refs/heads/main/wordlists/passwords/most_used_passwords.txt",
            "https://raw.githubusercontent.com/kkrypt0nn/wordlists/refs/heads/main/wordlists/passwords/nord_vpn.txt",
            "https://raw.githubusercontent.com/kkrypt0nn/wordlists/refs/heads/main/wordlists/passwords/openwall.txt",
            "https://raw.githubusercontent.com/kkrypt0nn/wordlists/refs/heads/main/wordlists/passwords/password.txt",
            "https://raw.githubusercontent.com/kkrypt0nn/wordlists/refs/heads/main/wordlists/passwords/postgres_default_passwords.txt",
            "https://raw.githubusercontent.com/kkrypt0nn/wordlists/refs/heads/main/wordlists/passwords/probable_wpa.txt",
            "https://raw.githubusercontent.com/kkrypt0nn/wordlists/refs/heads/main/wordlists/passwords/tomcat_mgr_default_passwords.txt",
            "https://raw.githubusercontent.com/kkrypt0nn/wordlists/refs/heads/main/wordlists/passwords/top_adobe_passwords.txt",
            "https://raw.githubusercontent.com/kkrypt0nn/wordlists/refs/heads/main/wordlists/passwords/unix_passwords.txt",
            "https://raw.githubusercontent.com/kkrypt0nn/wordlists/refs/heads/main/wordlists/passwords/xato_net_passwords.txt",
            "https://raw.githubusercontent.com/kkrypt0nn/wordlists/refs/heads/main/wordlists/user_agents/operating_system_name/android.txt",
            "https://raw.githubusercontent.com/kkrypt0nn/wordlists/refs/heads/main/wordlists/user_agents/operating_system_name/bada.txt",
            "https://raw.githubusercontent.com/kkrypt0nn/wordlists/refs/heads/main/wordlists/user_agents/operating_system_name/beos.txt",
            "https://raw.githubusercontent.com/kkrypt0nn/wordlists/refs/heads/main/wordlists/user_agents/operating_system_name/blackberry_os.txt",
            "https://raw.githubusercontent.com/kkrypt0nn/wordlists/refs/heads/main/wordlists/user_agents/operating_system_name/chromeos.txt",
            "https://raw.githubusercontent.com/kkrypt0nn/wordlists/refs/heads/main/wordlists/user_agents/operating_system_name/darwin.txt",
            "https://raw.githubusercontent.com/kkrypt0nn/wordlists/refs/heads/main/wordlists/user_agents/operating_system_name/fire_os.txt",
            "https://raw.githubusercontent.com/kkrypt0nn/wordlists/refs/heads/main/wordlists/user_agents/operating_system_name/freebsd.txt",
            "https://raw.githubusercontent.com/kkrypt0nn/wordlists/refs/heads/main/wordlists/user_agents/operating_system_name/haiku.txt",
            "https://raw.githubusercontent.com/kkrypt0nn/wordlists/refs/heads/main/wordlists/user_agents/operating_system_name/hp_webos.txt",
            "https://raw.githubusercontent.com/kkrypt0nn/wordlists/refs/heads/main/wordlists/user_agents/operating_system_name/ios.txt",
            "https://raw.githubusercontent.com/kkrypt0nn/wordlists/refs/heads/main/wordlists/user_agents/operating_system_name/irix.txt",
            "https://raw.githubusercontent.com/kkrypt0nn/wordlists/refs/heads/main/wordlists/user_agents/operating_system_name/linux.txt",
            "https://raw.githubusercontent.com/kkrypt0nn/wordlists/refs/heads/main/wordlists/user_agents/operating_system_name/livearea.txt",
            "https://raw.githubusercontent.com/kkrypt0nn/wordlists/refs/heads/main/wordlists/user_agents/operating_system_name/macos.txt",
            "https://raw.githubusercontent.com/kkrypt0nn/wordlists/refs/heads/main/wordlists/user_agents/operating_system_name/mac_os_x.txt",
            "https://raw.githubusercontent.com/kkrypt0nn/wordlists/refs/heads/main/wordlists/user_agents/operating_system_name/mac.txt",
            "https://raw.githubusercontent.com/kkrypt0nn/wordlists/refs/heads/main/wordlists/user_agents/operating_system_name/openbsd.txt",
            "https://raw.githubusercontent.com/kkrypt0nn/wordlists/refs/heads/main/wordlists/user_agents/operating_system_name/palm_os.txt",
            "https://raw.githubusercontent.com/kkrypt0nn/wordlists/refs/heads/main/wordlists/user_agents/operating_system_name/rim_tablet_os.txt",
            "https://raw.githubusercontent.com/kkrypt0nn/wordlists/refs/heads/main/wordlists/user_agents/operating_system_name/sunos.txt",
            "https://raw.githubusercontent.com/kkrypt0nn/wordlists/refs/heads/main/wordlists/user_agents/operating_system_name/symbian.txt",
            "https://raw.githubusercontent.com/kkrypt0nn/wordlists/refs/heads/main/wordlists/user_agents/operating_system_name/unix_based_os.txt",
            "https://raw.githubusercontent.com/kkrypt0nn/wordlists/refs/heads/main/wordlists/user_agents/operating_system_name/webos.txt",
            "https://raw.githubusercontent.com/kkrypt0nn/wordlists/refs/heads/main/wordlists/user_agents/operating_system_name/windows_mobile.txt",
            "https://raw.githubusercontent.com/kkrypt0nn/wordlists/refs/heads/main/wordlists/user_agents/operating_system_name/windows_phone.txt",
            "https://raw.githubusercontent.com/kkrypt0nn/wordlists/refs/heads/main/wordlists/user_agents/operating_system_name/windows.txt",
        ],
    },
    PARAMETERS_DEFINITIONS: {
        "--file": function (args, index, options) {
            options.testFile = args[index + 1];
        },
        "--index": function (args, index, options) {
            options.testPosition = args[index + 1];
        },
        "--download-dict": function (args, index, options) {
            options.downloadDict = true;
        },
        "--help": function (args, index, options) {
            options.showHelp = true;
        },
    },
};

config.parseArguments = function (argv) {
    let normalizedArgv = argv.slice(2);
    let stepOver = false;

    if (normalizedArgv.length === 2) {
        if (!normalizedArgv[0].match(/^-/) && !normalizedArgv[1].match(/^-/)) {
            normalizedArgv = ["--file", normalizedArgv[0], "--index", normalizedArgv[1]];
        }
    }

    const customParameters = normalizedArgv.reduce((acc, argPart, index) => {
        if (stepOver) {
            stepOver = false;
        } else if (config.PARAMETERS_DEFINITIONS[argPart]) {
            stepOver = config.PARAMETERS_DEFINITIONS[argPart](normalizedArgv, index, acc);
        } else if (argPart.match(/^-/)) {
            throw new Error(`Parameter "${argPart}" is not valid.`);
        }
        return acc;
    }, {});

    return Object.assign({}, config.DEFAULTS, customParameters);
};

Object.defineProperty(config, "workingDirectory", {
    get() {
        return config.parseArguments(process.argv).workingDirectory;
    },
});

Object.defineProperty(config, "sourceUrls", {
    get() {
        return config.parseArguments(process.argv).sourceUrls;
    },
});

Object.defineProperty(config, "testFile", {
    get() {
        const testFile = config.parseArguments(process.argv).testFile;
        if (!testFile) {
            throw new Error("Paremeter file must be a valid file name.");
        }
        return config.parseArguments(process.argv).testFile.toString();
    },
});

Object.defineProperty(config, "testPosition", {
    get() {
        const position = parseInt(config.parseArguments(process.argv).testPosition, 10);
        if (isNaN(position) || position < 0) {
            throw new Error("Paremeter index must be a positive number.");
        }
        return position;
    },
});

Object.defineProperty(config, "delimiter", {
    get() {
        return config.parseArguments(process.argv).delimiter;
    },
});

Object.defineProperty(config, "downloadDict", {
    get() {
        return Boolean(config.parseArguments(process.argv).downloadDict);
    },
});

Object.defineProperty(config, "showHelp", {
    get() {
        return process.argv.length === 2 || config.parseArguments(process.argv).showHelp;
    },
});

export default config;

export function parseArgs(args) {
    const options = {
        limit: '1000',
        workers: '4'
    };

    for (let i = 2; i < args.length; i++) {
        switch (args[i]) {
            case '-l':
            case '--limit':
                options.limit = args[++i];
                break;
            case '-w':
            case '--workers':
                options.workers = args[++i];
                break;
            default:
                console.log(`Unknown option: ${args[i]}`);
                process.exit(1);
        }
    }

    return options;
}

# EestiKeel-TeleGram-BOT

This bot uses [Eesti Keele Instituut API - EKILEX](https://github.com/keeleinstituut/ekilex/wiki/Ekilex-API) for translating the words and looking for their forms. Because it only works with initial forms of words, information from [Sonaveeb](https://sonaveeb.ee/) site is used to get initial forms.

Written using [Typescript](https://www.typescriptlang.org/) and [Deno](https://deno.com/).

# Use cases:
* Translate **FROM** Estonian - provides translation with initial forms and some of the forms of the word.
* Translate **TO** Estonian - returns potential word candidates.

# Configuration
Configuration is done via environment parameters:
* `TELEGRAM_BOT_API_KEY` - Key to use the bot
* `EKILEX_API_KEY` - key used to access EKILEX API - can be obtained by registering [here](https://ekilex.ee/)
* `BOT_ALLOWED_USERS` - comma-separated list of ids of users that are allowed to use the bot.
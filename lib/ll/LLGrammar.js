const Grammar = require('../Grammar');

class LLGrammar extends Grammar {
    constructor(cfg) {
        super(cfg);
    }

    build() {
        super.build();
        this.buildFollows();
    }
}

module.exports = LLGrammar;

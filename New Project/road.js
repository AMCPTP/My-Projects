// ======================================
// road.js
// Big Road Engine v1.0
// ======================================

class BigRoad {

    constructor(rows = 6) {

        this.rows = rows;

        this.columns = [];

    }

    // ------------------------

    clear() {

        this.columns = [];

    }

    // ------------------------

    add(result) {

        if (result === "T") {

            this.addTie();

            return;

        }

        if (this.columns.length === 0) {

            this.columns.push([]);

            this.columns[0].push(this.createCell(result));

            return;

        }

        const lastColumn = this.columns[this.columns.length - 1];

        const lastCell = lastColumn[lastColumn.length - 1];

        if (lastCell.result === result) {

            if (lastColumn.length < this.rows) {

                lastColumn.push(this.createCell(result));

            } else {

                this.columns.push([]);

                this.columns[this.columns.length - 1].push(this.createCell(result));

            }

        } else {

            this.columns.push([]);

            this.columns[this.columns.length - 1].push(this.createCell(result));

        }

    }

    // ------------------------

    addTie() {

        if (this.columns.length === 0)
            return;

        const col = this.columns[this.columns.length - 1];

        if (col.length === 0)
            return;

        col[col.length - 1].tie++;

    }

    // ------------------------

    createCell(result) {

        return {

            result: result,

            tie: 0

        };

    }

    // ------------------------

    load(history) {

        this.clear();

        history.forEach(r => this.add(r));

    }

    // ------------------------

    getColumns() {

        return this.columns;

    }

}

// ======================================
// Renderer
// ======================================

class BigRoadRenderer {

    constructor(elementId) {

        this.element = document.getElementById(elementId);

    }

    draw(columns) {

        this.element.innerHTML = "";

        this.element.style.display = "grid";

        this.element.style.gridTemplateColumns =
            `repeat(${Math.max(columns.length, 40)},30px)`;

        for (let c = 0; c < columns.length; c++) {

            const column = columns[c];

            for (let r = 0; r < 6; r++) {

                const div = document.createElement("div");

                div.classList.add("cell");

                if (column[r]) {

                    if (column[r].result === "P")
                        div.classList.add("player-cell");

                    if (column[r].result === "B")
                        div.classList.add("banker-cell");

                    div.innerHTML = column[r].result;

                    if (column[r].tie > 0) {

                        const badge = document.createElement("sup");

                        badge.innerHTML = column[r].tie;

                        badge.style.color = "yellow";

                        badge.style.fontSize = "9px";

                        div.appendChild(badge);

                    }

                }
                else {

                    div.classList.add("empty");

                }

                this.element.appendChild(div);

            }

        }

    }

}

// ======================================
// Global
// ======================================

const bigRoad = new BigRoad();

const bigRoadRenderer =
    new BigRoadRenderer("bigRoad");

// ======================================
// Update Function
// ======================================

function updateBigRoad(history) {

    bigRoad.load(history);

    bigRoadRenderer.draw(

        bigRoad.getColumns()

    );

}
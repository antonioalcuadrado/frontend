<div class="form-box">
    <form>
        <div class="form-group">
            <header>Crear un nuevo curso</header>
        </div>
        <div class="form-group">
            <label for="name">Nombre</label>
            <input
                type="text"
                id="name"
                placeholder="Ingeniería del software"
                minlength="3"
                maxlength="15"
                required
            />
        </div>

        <div class="form-group">
            <label for="code">Código</label>
            <input
                type="text"
                id="code"
                placeholder="INSO"
                minlength="3"
                maxlength="10"
                required
            />
        </div>

        <div class="form-group">
            <label for="description">Descripción</label>
            <textarea
                id="description"
                name="Descripción"
                rows="5"
                cols="30"
                placeholder="Grado de Ingeniería del software"
                minlength="5"
                maxlength="200"
            ></textarea>
        </div>

        <div class="form-group">
            <button aria-label="Crear">Crear curso</button>
        </div>
    </form>
</div>

<style>
    header,
    div,
    textarea,
    input {
        font-style: inherit;
        font-family: inherit;
    }


    .form-box {
        background: white;
        display: flex;
        flex-direction: column;
        padding: 25px;
        border-color: black;
        border: 1px solid;
        width: 40vh;
    }

    .form-box form .form-group {
        display: flex;
        flex-direction: column;
        margin-bottom: 10px;
    }

    .form-group label {
        margin-bottom: 5px;
    }

    .form-group header {
        font-size: 3.6vh;
        font-weight: 600;
    }

    .form-group textarea {
        resize: none;
        font-family: inherit;
        font-size: 2vh;
    }

    .form-group input,
    textarea {
        padding: 0.75rem;
        margin-bottom: 1rem;
        border: 2px solid #000;
        box-shadow: 4px 4px 0 #000;
    }

    .form-group button {
        display: inline-block;
        padding: 0.75rem 1.5rem;
        font-size: 1rem;
        text-align: center;
        text-decoration: none;
        color: #000;
        background-color: #fff;
        border: 2px solid #000;
        box-shadow: 4px 4px 0 #000;
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .form-group button:hover {
        box-shadow: 6px 6px 0 #000;
    }
</style>

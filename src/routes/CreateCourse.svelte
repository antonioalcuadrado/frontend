<script lang="ts">
    import { onMount } from "svelte"
    import { getCourse, postCourse } from "../hooks/course"

    // object that stores the error of each field of the form
    interface FormError {
        name: string;
        code: string;
        description: string;
    }

    // schema of the errors response
    interface ErrorResponse {
        detail: any;
    }

    // schema of the course fetch response
    interface Course {
        id: number;
        name: string;
        code: string;
        description?: string;
    }

    // schema of the post data
    interface CoursePost {
        name: string;
        code: string;
        description?: string;
    }

    let name = $state("");
    let code = $state("");
    let description = $state("");
    let errors = $state({ name: "", code: "", description: "" });

    let courses: Course[] | null = null;

    // fetch courses from db when the module loads
    onMount(async () => {
        courses = await getCourse()
    });

    function validateForm(): boolean {
        // validate name
        errors.name = "";
        if (!name) {
            errors.name = "El nombre del curso no puede estar vacío";
        } else if (name.length < 3 || name.length > 70) {
            errors.name = "El nombre tiene que tener entre 3 y 70 caracteres";
        } else if (
            courses &&
            courses.some(
                (course) => course.name.toLowerCase() === name.toLowerCase(),
            )
        ) {
            errors.name = "El nombre del curso ya está en uso";
        }

        // validate code
        errors.code = "";
        if (!code) {
            errors.code = "El código del curso no puede estar vacío";
        } else if (code.length < 3 || code.length > 10) {
            errors.code =
                "El código del curso tiene que tener entre 3 y 10 caracteres";
        } else if (
            courses &&
            courses.some(
                (course) => course.code.toLowerCase() === code.toLowerCase(),
            )
        ) {
            errors.code = "El código del curso ya está en uso";
        }

        // validate description
        errors.description = "";
        if (
            description &&
            (description.length < 5 || description.length > 200)
        ) {
            errors.description =
                "La descripción del curso tiene que tener entre 5 y 200 caracteres";
        }

        // return true if all errors are empty
        return Object.values(errors).every((error) => !error);
    }

    async function createCourse() {
        if (validateForm()) {
            postCourse(name, code.toUpperCase(), description)
        }
    }
</script>

<div class="form-box">
    <form onsubmit={createCourse}>
        <div class="form-group">
            <header>Crear un nuevo curso</header>
        </div>
        <div class="form-group">
            <label for="name">Nombre</label>
            <input
                type="text"
                id="name"
                bind:value={name}
                placeholder="Ingeniería del software"
                minlength="3"
                maxlength="70"
                required
            />
            {#if errors.name}
                <span>{errors.name}</span>
            {/if}
        </div>

        <div class="form-group">
            <label for="code">Código</label>
            <input
                type="text"
                id="code"
                bind:value={code}
                placeholder="INSO"
                minlength="3"
                maxlength="10"
                required
            />
            {#if errors.code}
                <span>{errors.code}</span>
            {/if}
        </div>

        <div class="form-group">
            <label for="description">Descripción</label>
            <textarea
                id="description"
                bind:value={description}
                rows="5"
                cols="30"
                placeholder="Grado de Ingeniería del software"
                minlength="5"
                maxlength="200"
            ></textarea>
            {#if errors.description}
                <span>{errors.description}</span>
            {/if}
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

    .form-group span {
        color: red;
        text-decoration: underline;
    }
</style>

<script lang="ts">
    import { onMount } from "svelte";

    interface FormError {
        field: string;
        message: string;
    }

    interface ErrorResponse {
        detail: any;
    }

    interface Course {
        id: number;
        name: string;
        code: string;
        description: string;
    }

    let name: string = "";
    let code: string = "";
    let description: string = "";
    let errors: FormError[] = [];
    let courses: Course[] | null = null;

    onMount(async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/courses");

            if (!response.ok) {
                const error_data = await response.json();
                throw Error(error_data.detail || `Error ${response.status}`);
            }

            courses = await response.json();
        } catch (error) {
            console.error(error);
        }
    });

    function validateForm(): boolean {
        errors = [];

        if (!name) {
            errors.push({
                field: "name",
                message: "El nombre del curso no puede estar vacío",
            });
        } else if (name.length < 3 || name.length > 40) {
            errors.push({
                field: "name",
                message: "El nombre tiene que tener entre 3 y 15 caracteres",
            });
        } else if (courses && courses.some((course) => course.name === name)) {
            errors.push({
                field: "name",
                message: "El nombre del curso ya está en uso",
            });
        }

        if (!code) {
            errors.push({
                field: "code",
                message: "El código del curso no puede estar vacío",
            });
        } else if (code.length < 3 || code.length > 10) {
            errors.push({
                field: "code",
                message:
                    "El código del curso tiene que tener entre 3 y 10 caracteres",
            });
        }

        if (!description) {
            errors.push({
                field: "description",
                message: "La descripción del curso no puede estar vacía",
            });
        } else if (description.length < 5 || description.length > 200) {
            errors.push({
                field: "name",
                message:
                    "La descripción del curso tiene que tener entre 5 y 200 caracteres",
            });
        }

        return errors.length === 0;
    }

    async function createCourse() {
        if (validateForm()) {
            try {
                const res: Response = await fetch(
                    "http://127.0.0.1:8000/courses",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ name, code, description }),
                    },
                );

                if (res.status === 500) {
                    throw Error("Internal server error");
                }

                const data: ErrorResponse = await res.json();

                if (!res.ok) {
                    console.error(data.detail);
                } else {
                    console.log("Course created!");
                }
            } catch (error) {
                console.error(error);
                throw error;
            }
        } else {
            console.error(errors);
        }
    }
</script>

<div class="form-box">
    <form on:submit={createCourse}>
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
                maxlength="40"
                required
            />
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

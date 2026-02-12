import os
import shutil

def manage_gallery():
    # Configuración de rutas
    base_dir = os.path.dirname(os.path.abspath(__file__))
    images_dir = os.path.join(base_dir, 'images')
    gitignore_path = os.path.join(base_dir, '.gitignore')

    # 1. Actualizar .gitignore para ignorar scripts de Python
    print("--- Verificando seguridad (.gitignore) ---")
    rule = "*.py"
    content = ""
    
    # Leer contenido actual si existe
    if os.path.exists(gitignore_path):
        with open(gitignore_path, 'r') as f:
            content = f.read()
    
    # Agregar regla si no existe
    if rule not in content:
        with open(gitignore_path, 'a') as f:
            # Asegurar salto de línea si el archivo no está vacío
            if content and not content.endswith('\n'):
                f.write('\n')
            f.write(f"{rule}\n")
        print(f"Seguridad actualizada: '{rule}' agregado a .gitignore")
    else:
        print(f"Seguridad correcta: '{rule}' ya existe en .gitignore")

    if not os.path.exists(images_dir):
        print(f"Error: No se encontró la carpeta 'images' en {base_dir}")
        return

    # 2. Limpiar archivos basura (~)
    print("\n--- Limpiando archivos basura ---")
    for filename in os.listdir(images_dir):
        if filename.endswith('~'):
            try:
                os.remove(os.path.join(images_dir, filename))
                print(f"Eliminado: {filename}")
            except OSError as e:
                print(f"Error al eliminar {filename}: {e}")

    # 3. Replicar imágenes de galería 01
    print("\n--- Replicando imágenes ---")
    source_files = [f for f in os.listdir(images_dir) if 'pic01' in f]
    
    targets = ['02', '03', '04', '05']
    for filename in source_files:
        src_path = os.path.join(images_dir, filename)
        for target in targets:
            new_filename = filename.replace('01', target)
            shutil.copy2(src_path, os.path.join(images_dir, new_filename))
            print(f"Generado: {new_filename}")

if __name__ == "__main__":
    manage_gallery()
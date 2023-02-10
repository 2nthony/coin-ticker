use tauri::AppHandle;

#[tauri::command]
pub fn update_tray_text(app: AppHandle, text: &str) {
    app.tray_handle().set_title(text).unwrap();
}

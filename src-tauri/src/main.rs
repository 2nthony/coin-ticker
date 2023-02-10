#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod ipc;

use crate::ipc::update_tray_text;

use tauri::{
    ActivationPolicy, AppHandle, CustomMenuItem, GlobalWindowEvent, Manager, SystemTray,
    SystemTrayEvent, SystemTrayMenu, WindowEvent,
};
use tauri_plugin_positioner::{Position, WindowExt};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
    let quit = CustomMenuItem::new("quit".to_string(), "Quit").accelerator("Command+Q");
    let tray_menu = SystemTrayMenu::new().add_item(quit);

    let tray = SystemTray::new().with_menu(tray_menu).with_title("-");

    tauri::Builder::default()
        .plugin(tauri_plugin_positioner::init())
        .invoke_handler(tauri::generate_handler![greet, update_tray_text])
        .setup(|app| {
            app.set_activation_policy(ActivationPolicy::Accessory);
            Ok(())
        })
        .system_tray(tray)
        .on_system_tray_event(system_tray_event)
        .on_window_event(window_event)
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

fn system_tray_event(app: &AppHandle, event: SystemTrayEvent) {
    tauri_plugin_positioner::on_tray_event(app, &event);

    match event {
        SystemTrayEvent::LeftClick { position: _, .. } => {
            let window = app.get_window("main").unwrap();
            window.move_window(Position::TrayCenter).unwrap();

            if window.is_visible().unwrap() {
                window.hide().unwrap();
            } else {
                window.show().unwrap();
                window.set_focus().unwrap();
            }
        }
        SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
            "quit" => std::process::exit(0),
            _ => {}
        },
        _ => {}
    }
}

fn window_event(event: GlobalWindowEvent) {
    match event.event() {
        WindowEvent::Focused(false) => {
            let window = event.window().get_window("main").unwrap();
            // window.hide().unwrap();
        }
        _ => {}
    }
}

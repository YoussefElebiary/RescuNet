# RescuNet

<div align="center" style="padding: 0; margin: 0; top: 0;">
  <img src="./assets/rescunet.png" alt="RescuNet Text" width="300" />
  <p><b>Next-Gen Disaster Response Intelligence</b></p>
  <p>
    <a href="#key-features">Key Features</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#installation">Installation</a> •
    <a href="#usage">Usage</a> •
    <a href="#license">License</a>
  </p>
</div>

---

RescuNet is a comprehensive platform designed to revolutionize emergency response operations. By integrating AI-powered aerial surveillance, advanced graph-based routing, and real-time text analysis, RescuNet empowers responders to locate survivors, identify hazards, and navigate complex disaster zones with unprecedented efficiency.

## Key Features

### 🗺️ Graph Routing
- **Smart Pathfinding**: Leverages **Graph Neural Networks (GNN)** to predict edge safety and travel costs dynamically.
- **Hybrid Solver**: Features a high-performance **C++ Routing Engine** with a robust Python fallback to calculate optimal rescue paths.
- **Interactive Map**: Plan missions, manage nodes, and visualize routes using **MapLibre GL JS**.

![Route Planner Screenshot](./assets/route.png)
*Interactive Mission Planning Map*

### 🚁 Aerial Intelligence
- **Real-Time Detection**: Utilizes **YOLOv11** to detect survivors and fire hazards instantly from drone video feeds.
- **Dual-Mode Surveillance**: Supports both **Thermal** (Person Detection) and **RGB** (Fire Detection) modes for versatile operation.
- **Low-Latency Streaming**: WebSocket-based architecture ensures real-time video transmission and processing.

![Aerial Intelligence Screenshot](./assets/live_feed.png)
*Live Drone Feed with Object Detection*

### 💬 Text Analysis
- **Emergency Classification**: Analyzes distress messages and reports to distinguish between genuine emergencies, non-emergencies, and fake/spam reports.
- **Entity Extraction**: Automatically identifies key information within text to aid decision-making.

![Text Analysis Screenshot](PLACEHOLDER_IMAGE_URL_HERE)
*Emergency Text Classification Interface*

## Tech Stack

- **Backend**: FastAPI, Python 3.9
- **Core Logic**: C++, PyBind11, OSMNx, NetworkX
- **AI / ML**: PyTorch, PyTorch Geometric, Ultralytics YOLO
- **Frontend**: HTML5, JavaScript (ES6+), TailwindCSS, MapLibre GL JS
- **Dependency Management**: Pipenv

## Installation

### Prerequisites
- Python 3.9 or higher
- Pipenv (`pip install pipenv`)
- C++ Compiler (GCC/Clang/MSVC) for the routing engine

### 1. Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd backend
pipenv install
pipenv shell
```

### 2. Build C++ Routing Engine

Compile the high-performance C++ solver extension:

```bash
cd cpp_router
pip install .
cd ..
```

### 3. Frontend Setup

No build step is required for the frontend as it uses vanilla JS and CDN-hosted libraries.

## Usage

### Start the Backend Server
Run the following command from within the `backend` directory (ensure your virtual environment is active):

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`.
- **API Documentation**: `http://localhost:8000/docs`
- **Health Check**: `http://localhost:8000/api/health`

### Launch the Frontend
Open `frontend/index.html` in your web browser.

> **Note**: For the best experience and to avoid CORS issues with local file access, it is recommended to serve the frontend using a local development server (e.g., "Live Server" extension in VS Code or `python -m http.server`).

## Project Structure

```
RescuNet/
├── assets/                    # Project screenshots and logos
├── backend/                   # FastAPI application
│   ├── app/                   # Main application logic and endpoints
│   ├── models/                # GNN and YOLO model definitions
│   ├── router/                # Routing logic (Python & C++)
│   ├── docs/                  # Backend documentation
│   └── Pipfile                # Python dependencies
├── frontend/                  # User Interface
│   ├── static/                # CSS, JS, and image assets
│   ├── index.html             # Landing page
│   ├── camera.html            # Live surveillance feed
│   ├── route.html             # Mission planning map
│   ├── text_analysis.html     # Text classification tool
│   └── drone_simulation.html  # Drone simulation (accessible via URL only)
├── LICENSE                    # Project license file
└── README.md                  # Project documentation
```

## Authors

| Name            | Role                                      |
|-----------------|-------------------------------------------|
| [Youssef Elebiary](https://github.com/YoussefElebiary)| Graph Routing Engine (GNN & C++) & Fullstack Development |
| [Akram Tarek](https://github.com/Akramz1)     | Text Analysis ML Models                   |
| [Ahmed Ghazaly](https://github.com/ghazaly118) | Text Analysis ML Models                   |
| [Amr Hassan](https://github.com/amr1372003)      | Object Detection AI Models                |
| [Mohamed Maher](https://github.com/Maherr11)   | Object Detection AI Models                |

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **Ultralytics** for the YOLO models.
- **OSMNx** for simplifying OpenStreetMap graph retrieval.
- **MapLibre** for the open-source mapping library.

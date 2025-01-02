from alembic import command
from alembic.config import Config
from pathlib import Path
import os
from .database import SQLALCHEMY_DATABASE_URL

def run_migrations():
    # Get the directory where this file is located
    current_dir = Path(__file__).parent
    
    # Create alembic.ini
    alembic_ini = current_dir / "alembic.ini"
    if not alembic_ini.exists():
        config = Config()
        config.set_main_option("script_location", str(current_dir / "alembic"))
        config.set_main_option("sqlalchemy.url", SQLALCHEMY_DATABASE_URL)
        config.set_main_option("file_template", "%%(year)d_%%(month).2d_%%(day).2d_%%(hour).2d%%(minute).2d-%%(rev)s_%%(slug)s")
        with open(alembic_ini, "w") as f:
            config.write(f)
    
    config = Config(str(alembic_ini))
    
    # Initialize alembic if not already initialized
    migrations_dir = current_dir / "alembic"
    if not migrations_dir.exists():
        command.init(config, str(migrations_dir))
        
        # Update env.py to use our models
        env_py = migrations_dir / "env.py"
        with open(env_py, "r") as f:
            content = f.read()
        
        content = content.replace(
            "target_metadata = None",
            "from src.backend.models import Base\ntarget_metadata = Base.metadata"
        )
        
        with open(env_py, "w") as f:
            f.write(content)
    
    try:
        # Generate migration
        command.revision(config, autogenerate=True, message="Auto-generated migration")
        # Apply migration
        command.upgrade(config, "head")
    except Exception as e:
        print(f"Migration error: {str(e)}")
        # If tables don't exist, create them
        from .models import Base
        from .database import engine
        Base.metadata.create_all(bind=engine) 
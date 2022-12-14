"""empty message

Revision ID: f506766dbdd9
Revises: 
Create Date: 2023-01-02 16:25:04.941734

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f506766dbdd9'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('celular',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('marca', sa.String(length=20), nullable=False),
    sa.Column('modelo', sa.String(length=150), nullable=False),
    sa.Column('foto', sa.String(length=500), nullable=False),
    sa.Column('descripcion', sa.String(length=500), nullable=False),
    sa.Column('precio', sa.String(length=10), nullable=False),
    sa.Column('cantidad', sa.String(length=5), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('modelo')
    )
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('password', sa.String(length=80), nullable=False),
    sa.Column('is_active', sa.Boolean(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('user')
    op.drop_table('celular')
    # ### end Alembic commands ###

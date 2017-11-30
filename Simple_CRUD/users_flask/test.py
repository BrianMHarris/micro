from project import app, db
from project.users.models import User
from flask_testing import TestCase
import unittest

class RenderTestCase(TestCase):

    def create_app(self):
        return app

    def test_render_root(self):
        response = self.client.get('/', content_type='html/text')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'Users Blueprint', response.data)

    def test_render_users_new(self):
        response = self.client.get('/users/new', content_type='html/text')
        self.assertEqual(response.status_code, 200)

class DBTestCase(TestCase):

    def create_app(self):
        # let's use SQLite3 as it is much faster to test with than a larger postgres DB
        app.config["SQLALCHEMY_DATABASE_URI"] = 'sqlite:///testing.db'
        return app

    def setUp(self):
        db.create_all()
        user1 = User("Brian")
        user2 = User("Jenny")
        user3 = User("Grayson")
        db.session.add_all([user1, user2, user3])
        db.session.commit()

    def tearDown(self):
        db.drop_all()

    def test_index(self):
        """index displays all users"""
        response = self.client.get('/users/', content_type='html/text')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'Brian', response.data)
        self.assertIn(b'Jenny', response.data)
        self.assertIn(b'Grayson', response.data)

    def test_show(self):
        """show displays appropriately"""
        response = self.client.get('/users/1')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'Delete me?', response.data)

    def test_create(self):
        """creates new user"""
        response = self.client.post(
            '/users/',
            data=dict(user_name="New Guy"),
            follow_redirects=True
        )
        self.assertIn(b'New Guy', response.data)

    def test_edit(self):
        """edit page displays correctly"""
        response = self.client.get(
          '/users/1/edit',
        )
        self.assertIn(b'Brian', response.data)

    # def test_update(self):
    #     """resource updates properly"""
    #     response = self.client.patch(
    #         '/users/1',
    #         data=dict(user_name="Upgrayde"),
    #         follow_redirects=True
    #     )
    #     self.assertIn(b'Upgrayde', response.data)
    #     self.assertNotIn(b'Brian', response.data)

    def test_delete(self):
        """resource properly deleted"""
        response = self.client.delete(
            '/users/1',
            follow_redirects=True
        )
        self.assertNotIn(b'Brian', response.data)

if __name__ == '__main__':
    unittest.main()

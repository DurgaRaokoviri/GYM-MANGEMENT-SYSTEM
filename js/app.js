// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged, signOut, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  // ... Your Firebase configuration details
};

// Initialize Firebase app (ensure it's called only once)
let app;
if (!app) {
  app = initializeApp(firebaseConfig);
}

const db = getFirestore(app);
const auth = getAuth(app);

// Listen for authentication state changes
onAuthStateChanged(auth, async (user) => {
  if (user) {
    await handleRoleBasedRedirect(user);
  } else {
    console.log("No user is signed in.");
  }
});

// Function to handle role-based redirection
async function handleRoleBasedRedirect(user) {
  const uid = user.uid;
  const userRef = doc(db, 'users', uid);

  try {
    const docSnapshot = await getDoc(userRef);
    if (docSnapshot.exists()) {
      const userData = docSnapshot.data();
      const role = userData.role;

      if (role === 'admin') {
        window.location.href = 'admin_dashboard.html';
      } else if (role === 'member') {
        window.location.href = 'member_dashboard.html';
      } else {
        console.error("Invalid user role");
      }
    } else {
      console.log("No such user document found!");
    }
  } catch (error) {
    console.error("Error getting document:", error);
  }
}

// Function to login a user
function loginUser() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;   


  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("User logged in successfully:", userCredential.user);   

    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Login error:", errorMessage);
      document.getElementById("loginMessage").textContent = errorMessage;
    });

  return false; // Prevent form submission
}

// Function to logout the user
function logout() {
  signOut(auth).then(() => {
    console.log("User signed out.");
    window.location.href = 'index.html'; // Redirect to login
  }).catch((error) => {
    console.error("Sign out error:", error);
  });
}